﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeleeIndex.Contracts.Sources;

public class CreateSourceModel
{
    public required string Name { get; set; }

    public required string Description { get; set; }

    public required string Url { get; set; }
}
