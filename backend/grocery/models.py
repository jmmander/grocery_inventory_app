#https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
#https://docs.python.org/2/library/hashlib.html

from django.db import models
import hashlib


# Create your models here.
class Grocery_Item(models.Model):

    location_choices = [
        ('Pantry', 'Pantry'),
        ('Fridge', 'Refrigerator'),
        ('Freezer', 'Freezer'),
    ]

    status_choices = [
        ('Sale', 'On sale'),
        ('Full', 'Full price'),
    ]

    name = models.CharField(max_length=120, unique=True)
    quantity = models.IntegerField(default=True)
    location = models.CharField(choices=location_choices, max_length=7)
    taxable = models.BooleanField(default=True)
    status = models.CharField(choices=status_choices, max_length=4, default='Full')

    def _str_(self):
        return self.name


class Employee(models.Model):

    email = models.EmailField(max_length=120, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    password = models.CharField(max_length=20)

    def save(self, *args, **kwargs):
        self.password = hashlib.md5(self.password.encode()).hexdigest()
        return super().save(*args, **kwargs)

