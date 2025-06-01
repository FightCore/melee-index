import { DynamicDialogRef } from "primeng/dynamicdialog";

export abstract class CreationDialog {
  constructor(protected readonly ref: DynamicDialogRef) {}

  close(): void {
     this.ref.close();
  }
}
