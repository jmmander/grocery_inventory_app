#https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react

from rest_framework import viewsets
from .serializers import GroceryItemSerializer, EmployeeSerializer
from .models import Grocery_Item, Employee
from django.http import HttpResponse
import hashlib


class GroceryItemView(viewsets.ModelViewSet):
  serializer_class = GroceryItemSerializer
  queryset = Grocery_Item.objects.all()


class EmployeeView(viewsets.ModelViewSet):
  serializer_class = EmployeeSerializer
  queryset = Employee.objects.all()


def EmpAuth(request):
  if request.method == 'GET':
    email = request.GET['email']
    password= request.GET['pw']
    password = hashlib.md5(password.encode()).hexdigest()
    employee = Employee.objects.all().filter(email=email, password=password)
    serializer = EmployeeSerializer(employee, many=True)
    emp_data = serializer.data
    if emp_data == []:
      return HttpResponse(status=403)
    return HttpResponse(status=200)

