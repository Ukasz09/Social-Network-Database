import random
import csv
from datetime import datetime, timedelta

DATE_FORMAT = "%Y-%m-%d"


def csv_data_to_list(csv_filepath, data_columns=1, delimiter=",", quotechar='"'):
    with open(csv_filepath, newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=delimiter, quotechar=quotechar)
        return [row[data_columns] for row in reader]


def get_csv_write_file(csv_filepath):
    return open(csv_filepath, 'w', newline='')


def rand_elem(elem_list):
    index = random.randint(0, len(elem_list) - 1)
    return elem_list[index]


def rand_date(start, end):
    delta = end - start
    random_days = random.randrange(delta.days)
    return start + timedelta(days=random_days)


def format_date(date):
    return datetime.strftime(date, DATE_FORMAT)
