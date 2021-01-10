##https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
from rest_framework import serializers
from .models import Grocery_Item, Employee
from django.contrib.auth.models import User

class GroceryItemSerializer(serializers.ModelSerializer):
  class Meta:
    model = Grocery_Item
    fields = ('id', 'name', 'quantity', 'location', 'taxable', 'status')


class EmployeeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Employee
    fields = ('id', 'email', 'first_name', 'last_name', 'password')
