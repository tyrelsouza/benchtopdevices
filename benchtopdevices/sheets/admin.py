from django.contrib import admin
from sheets.models import (
    Configuration,
    Sheet
)

class ConfigurationAdmin(admin.ModelAdmin):
    pass

admin.site.register(Configuration, ConfigurationAdmin)


class SheetAdmin(admin.ModelAdmin):
    pass

admin.site.register(Sheet, SheetAdmin)
