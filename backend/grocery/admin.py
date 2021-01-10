
from django.contrib import admin
from .models import Grocery_Item, Employee

# Register your models here.

class groceryAdmin(admin.ModelAdmin):
    list_display = ('name', 'quantity', 'location', 'taxable', 'status')


admin.site.register(Grocery_Item, groceryAdmin)


class employeeAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'password')


admin.site.register(Employee, employeeAdmin)