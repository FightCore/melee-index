using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MeleeIndex.Services.Authentication
{
    public class OAuthUser
    {
        public required string Email { get; set; }

        public required string Username { get; set; }

        public required string Provider { get; set; }

        public required string ProviderId { get; set; }
    }
}
