# Generated by Django 3.1.5 on 2021-01-06 18:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('grocery', '0003_auto_20210106_1803'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='grocery_items',
            new_name='Grocery_Item',
        ),
    ]
