from django import template
from django.template.defaultfilters import stringfilter
import random
import string
register = template.Library()

@register.filter(is_safe=True)
def random_str(value):
    return value.replace(value, ''.join(random.choices(string.ascii_uppercase + string.digits, k=5)))

