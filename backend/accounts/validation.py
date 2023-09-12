from django.core.exceptions import ValidationError

def validate_pdf_file_extension(value):
    import os
    ext = os.path.splitext(value.name)[1]  # Get the file extension
    valid_extensions = ['.pdf']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')
