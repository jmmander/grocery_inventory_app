# Generated by Django 3.1.5 on 2021-01-06 18:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0002_grocery_item_status'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='grocery_item',
            new_name='grocery_items',
        ),
    ]
