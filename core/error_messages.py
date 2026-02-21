class ERROR_MESSAGES:
    """Centralized error message constants for the entire application."""

    # ── Auth ──────────────────────────────────────────
    UNAUTHORIZED = "Unauthorized. Please log in to continue."
    FORBIDDEN = "Access denied. You do not have permission."
    TOKEN_EXPIRED = "Session expired. Please log in again."
    TOKEN_INVALID = "Invalid token. Authentication failed."
    INVALID_CREDENTIALS = "Incorrect username or password."
    ACCOUNT_LOCKED = "Account locked. Contact support."
    ACCOUNT_NOT_VERIFIED = "Please verify your email before logging in."
    ROLE_MISMATCH = "The provided role does not match the registered role."

    # ── Validation ────────────────────────────────────
    VALIDATION_FAILED = "Validation failed. Check the submitted data."
    REQUIRED_FIELD_MISSING = "One or more required fields are missing."
    INVALID_EMAIL_FORMAT = "Please provide a valid email address."
    PASSWORD_TOO_WEAK = (
        "Password must be at least 8 characters with uppercase, number, and symbol."
    )
    PASSWORD_MISMATCH = "Password and confirm password do not match."
    DUPLICATE_ENTRY = "This record already exists."
    USERNAME_TAKEN = "This username is already taken."
    EMAIL_TAKEN = "This email is already registered."

    # ── Resource ──────────────────────────────────────
    NOT_FOUND = "The requested resource was not found."
    USER_NOT_FOUND = "User not found."
    RECORD_NOT_FOUND = "Record not found."
    ALREADY_EXISTS = "A resource with this identifier already exists."
    CONFLICT = "Request conflicts with current state of the resource."

    # ── Server ────────────────────────────────────────
    INTERNAL_SERVER_ERROR = "An unexpected error occurred. Please try again later."
    SERVICE_UNAVAILABLE = "Service is temporarily unavailable. Try again shortly."
    DATABASE_ERROR = "Database operation failed."
    THIRD_PARTY_ERROR = "External service failed. Please try again."
    TIMEOUT = "The request timed out. Please retry."

    # ── File / Upload ─────────────────────────────────
    FILE_TOO_LARGE = "File size exceeds the maximum allowed limit."
    INVALID_FILE_TYPE = "File type not supported."
    UPLOAD_FAILED = "File upload failed. Please try again."

    # ── Rate Limiting ─────────────────────────────────
    TOO_MANY_REQUESTS = "Too many requests. Please slow down and try again later."
    RATE_LIMIT_EXCEEDED = "Rate limit exceeded. Wait before retrying."
