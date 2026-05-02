def environment_callback(request):
    """
    Returns the current environment label for the admin header.
    Shows a colored badge in the top bar so admins know which environment they're in.
    """
    return "Development"
