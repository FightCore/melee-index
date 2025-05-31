namespace MeleeIndex.Api.Validators
{
    public static class HttpsUrlValidator
    {
        public static bool IsValidHttpsUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
            {
                return false;
            }
            if (!Uri.TryCreate(url, UriKind.Absolute, out var uriResult))
            {
                return false;
            }
            return uriResult.Scheme == Uri.UriSchemeHttps;
        }
    }
}
