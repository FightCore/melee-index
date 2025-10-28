import {
  flattenData,
  generateColors,
  getMappedUnique,
  HitboxColor,
  processDuplicateHitboxes,
  processDuplicateHits,
} from '@/app/utilities/hitbox-utils';
import { Move } from '@/models/frame-data/move';
import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-hit-timeline',
  imports: [],
  templateUrl: './hit-timeline.component.html',
  styleUrl: './hit-timeline.component.scss',
  standalone: true,
})
export class HitTimelineComponent implements OnInit, OnDestroy {
  move = input.required<Move>();
  setFrame = output<number>();
  private readonly frames: {
    value: number;
    color: string;
    borderColor: string;
  }[] = [];
  private colors: HitboxColor[] = [];

  ngOnInit(): void {
    const processedHits = processDuplicateHitboxes(this.move().hits!);
    const data = processDuplicateHits(flattenData(processedHits));
    this.colors = generateColors(data, true);

    for (let frame = 1; frame < this.move().totalFrames + 1; frame++) {
      this.frames.push({
        value: frame,
        color: this.getColor(this.colors, frame),
        borderColor: this.getBorderColor(frame),
      });
    }

    this.drawTimeline();

    // Add a debounced resize listener to redraw when the container width changes
    if (!this.resizeListenerAdded) {
      this.onResize = () => {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = window.setTimeout(() => {
          this.drawTimeline();
        }, 150);
      };
      window.addEventListener('resize', this.onResize);
      this.resizeListenerAdded = true;
    }
  }

  private resizeTimeout: number | null = null;
  private resizeListenerAdded = false;
  private onResize: (() => void) | null = null;

  drawTimeline() {
    const rectSize = 30; // Size of each rectangle (reduced size)
    const spacing = 5; // Spacing between rectangles
    const maxColumns = 20; // Maximum number of columns

    const timelineContainer = d3.select('#d3-based-hitbox-timeline');

    // Clear any existing SVG elements
    timelineContainer.selectAll('*').remove();

    const node = timelineContainer.node() as Element | null;

    if (node === null) {
      throw new Error('Node is unexpected null');
    }

    const containerWidth = node.clientWidth;
    const columns = Math.min(Math.floor(containerWidth / (rectSize + spacing)), maxColumns);
    const rows = Math.ceil(this.frames.length / columns);
    const svgWidth = columns * (rectSize + spacing);
    const svgHeight = 10 + rows * (rectSize + spacing);

    const svg = timelineContainer.append('svg').attr('width', svgWidth).attr('height', svgHeight);

    // Legend data
    const legendData = [
      { label: 'IASA', color: 'orange', borderColor: 'none' },
      { label: 'Auto Cancelable', color: 'none', borderColor: 'green' },
    ];

    for (const color of getMappedUnique(this.colors, (color) => color.color)) {
      const value = this.colors.filter((storedColor) => storedColor.color === color);
      if (value) {
        legendData.push({
          label: `Hits between frame ${Math.min(...value.map((hitbox) => hitbox.start))} and ${Math.max(
            ...value.map((hitbox) => hitbox.end)
          )}`,
          color: color,
          borderColor: 'none',
        });
      }
    }

    const component = this;

    const legendContainer = d3.select('#d3-based-legend');

    // Clear any existing SVG elements
    legendContainer.selectAll('*').remove();

    // Legend SVG
    const legendSvg = legendContainer
      .append('svg')
      .attr('width', 300)
      .attr('height', 100 + legendData.length * rectSize);

    legendSvg
      .selectAll('rect')
      .data(legendData)
      .enter()
      .append('rect')
      .attr('x', 10)
      .attr('y', (d, i) => 10 + i * 40)
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('fill', (d) => d.color)
      .attr('stroke', (d) => d.borderColor)
      .attr('stroke-width', 2)
      .attr('rx', 5)
      .attr('ry', 5);

    legendSvg
      .selectAll('text')
      .data(legendData)
      .enter()
      .append('text')
      .text((d) => d.label)
      .attr('x', 60)
      .attr('y', (d, i) => 30 + i * 40)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', (d) => (d.color === '#ffffff' || 'light' === 'light' ? 'black' : 'white'))
      .attr('alignment-baseline', 'middle');

    svg
      .selectAll('rect')
      .data(this.frames)
      .enter()
      .append('rect')
      .attr('x', (d, i) => (i % columns) * (rectSize + spacing))
      .attr('y', (d, i) => 10 + Math.floor(i / columns) * (rectSize + spacing))
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('fill', (d) => d.color)
      .attr('stroke', (d) => d.borderColor)
      .attr('stroke-width', 2)
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('cursor', 'pointer')
      .on('click', function () {
        const index = d3.select(this).datum() as { value: number };
        component.setFrame.emit(index.value - 1);
      });

    svg
      .selectAll('text')
      .data(this.frames)
      .enter()
      .append('text')
      .text((d) => d.value.toString())
      .attr('x', (d, i) => (i % columns) * (rectSize + spacing) + rectSize / 2)
      .attr('y', (d, i) => 13 + Math.floor(i / columns) * (rectSize + spacing) + rectSize / 2)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '15px') // Adjusted font size
      .attr('fill', (d) => (d.color === '#ffffff' || 'light' === 'light' ? 'black' : 'white'))
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('cursor', 'pointer')
      .on('click', function () {
        const index = d3.select(this).datum() as { value: number };
        component.setFrame.emit(index.value - 1);
      });
  }

  ngOnDestroy(): void {
    if (this.resizeListenerAdded && this.onResize) {
      window.removeEventListener('resize', this.onResize);
      this.resizeListenerAdded = false;
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = null;
    }
  }

  getColor(colors: HitboxColor[], value: number): string {
    // Account for counting at 0 instead of 1
    const color = this.getHitboxColor(colors, value);

    if (color) {
      return color;
    }

    if (this.move().iasa == value) {
      return 'orange';
    }

    // if (theme === 'dark') {
    //   return '#1f2937';
    // }
    return '#ffffff';
  }

  getHitboxColor(hits: HitboxColor[], frame: number): string | null {
    if (hits.every((hit) => hit.start === 0 && hit.end === 0)) {
      return null;
    }

    const index = hits.findIndex((hit) => frame >= hit.start && frame <= hit.end);

    if (index == -1) {
      return null;
    }

    return hits[index].color;
  }

  getBorderColor(frame: number): string {
    if (
      (this.move().autoCancelBefore && this.move().autoCancelBefore! > frame) ||
      (this.move().autoCancelAfter && this.move().autoCancelAfter! < frame)
    ) {
      return 'green';
    }

    return '';
  }
}
