from django.test import TestCase, Client
from .models import Employee
import hashlib
import unittest


# Create your tests here.
class EmployeeTest(TestCase):

    @classmethod
    def test_save_employee(self):
        harry =  Employee.objects.create(email='email@test.com', first_name='Harry', last_name='Sarry', password='password')
        password = harry.password
        hash = hashlib.md5('password'.encode()).hexdigest()
        assert password == hash


class ViewTest(unittest.TestCase):
    def test_employees(self):
        client = Client()
        response = client.get('/api/employees/')
        self.assertEqual(response.status_code, 200)

    def test_grocery_items(self):
        client = Client()
        response = client.get('/api/grocery_items/')
        self.assertEqual(response.status_code, 200)

    def test_login(self):
        Employee.objects.create(email='email@test.com', first_name='Harry', last_name='Sarry', password='password')
        client = Client()
        response = client.get('/api/employees/auth?email=email@test.com&pw=password')
        self.assertEqual(response.status_code, 200)