from datetime import datetime, timedelta

import app.utils as utils
import shortuuid
import random

# input
FEMALE_NAME_CSV = "data/csv/female_names.csv"
MALE_NAME_CSV = "data/csv/male_names.csv"
SURNAMES_CSV = "data/csv/surnames.csv"

# others
MIN_ALLOWED_USER_AGE = 13

# -------------------------------------------------------------------------------------------------------------------- #
female_names = utils.csv_data_to_list(FEMALE_NAME_CSV)
male_names = utils.csv_data_to_list(MALE_NAME_CSV)
surnames = utils.csv_data_to_list(SURNAMES_CSV)


def rand_user_birth_date():
    start_date = datetime.strptime("1950-01-01", utils.DATE_FORMAT)
    end_date = datetime.now() - timedelta(days=MIN_ALLOWED_USER_AGE * 365)
    return utils.rand_date(start_date, end_date)


def gen_raw_users(qty):
    id_list = []
    rows = []
    for i in range(qty):
        uid = shortuuid.uuid()
        sex = 'W' if random.randint(0, 1) == 0 else 'M'
        name = utils.rand_elem(female_names) if sex == "W" else utils.rand_elem(male_names)
        birth_date = utils.format_date(rand_user_birth_date())
        user_dict = {
            '_id': uid,
            'surname': utils.rand_elem(surnames),
            'name': name,
            'birth_date': {'$date': birth_date+"T00:00:00Z"},
            'sex': sex
        }
        rows.append(user_dict)
        id_list.append(uid)
    return id_list, rows


if __name__ == "__main__":
    gen_raw_users(5)
