from django.contrib import admin
from .models import User,UserRole,Department
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.


class UserModelAdmin(BaseUserAdmin):

    def get_roles(self, obj):
        return ", ".join([str(role) for role in obj.roles.all()])
    get_roles.short_description = 'Roles'

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserModelAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "full_Name","is_admin","is_active","get_roles","phone_number","signtr","company","department","direct_number","locaton"]
    list_filter = ["is_admin","is_active"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["full_Name","phone_number","signtr","department","direct_number","locaton"]}),
        ("Permissions", {"fields": ["is_admin", "roles","is_active","company"]}),
    ]
    # add_fieldsets is not a standard ModelAdmin attribute. UserModelAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "full_Name", "password1", "password2", "roles","phone_number","signtr","is_active","company","department","direct_number","locaton"],
            },
        ),
    ]

    # search the email in the admin site
    search_fields = ["email"]

# ordering(assending desending) the email and id in the admin site
    ordering = ["email","id"]
    filter_horizontal = ['roles',] 

class DepartmentAdmin(admin.ModelAdmin):
    list_display=['id','dprtmnt_name']


class UserRoleAdmin(admin.ModelAdmin):
    list_display=['id','name','description']


# Now register the new UserAdmin...
admin.site.register(User, UserModelAdmin)
admin.site.register(UserRole,UserRoleAdmin)
admin.site.register(Department,DepartmentAdmin)
#kdsfksdksjdksjdksj