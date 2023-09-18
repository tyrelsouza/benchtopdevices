from django.contrib import admin
from .models import (
    Sheet
)


class SheetAdmin(admin.ModelAdmin):
    pass

admin.site.register(Sheet, SheetAdmin)
