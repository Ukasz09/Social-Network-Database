import csv
from datetime import datetime, timedelta
import app.utils as utils
import shortuuid
import random

# input
FEMALE_NAME_CSV = "csv/female_names.csv"
MALE_NAME_CSV = "csv/male_names.csv"
SURNAMES_CSV = "csv/surnames.csv"

# output
USERS_CSV = "csv/users.csv"

# others
CSV_DELIMITER = ","
MIN_ALLOWED_USER_AGE = 13

# -------------------------------------------------------------------------------------------------------------------- #
female_names = utils.csv_data_to_list(FEMALE_NAME_CSV)
male_names = utils.csv_data_to_list(MALE_NAME_CSV)
surnames = utils.csv_data_to_list(SURNAMES_CSV)


def rand_user_birth_date():
    start_date = datetime.strptime("1950-01-01", utils.DATE_FORMAT)
    end_date = datetime.now() - timedelta(days=MIN_ALLOWED_USER_AGE * 365)
    return utils.rand_date(start_date, end_date)


def generate_user_data(amount):
    csv_file = utils.get_csv_write_file(USERS_CSV)
    csv_writer = csv.writer(csv_file, delimiter=CSV_DELIMITER)
    indexes = []
    for i in range(amount):
        uid = shortuuid.uuid()
        sex = 'W' if random.randint(0, 1) == 0 else 'M'
        name = utils.rand_elem(female_names) if sex == "W" else utils.rand_elem(male_names)
        birth_date = utils.format_date(rand_user_birth_date())
        row = [uid, utils.rand_elem(surnames), name, birth_date, sex]
        csv_writer.writerow(row)
        indexes.append(i)
    csv_file.close()
    return indexes


if __name__ == "__main__":
    generate_user_data(5)
