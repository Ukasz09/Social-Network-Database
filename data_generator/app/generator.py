from app.users import gen_raw_users
from app.posts import gen_posts_list
import json

USERS_QTY = 250
POSTS_QTY = 250

POSTS_PATH = "data/posts.json"
USERS_PATH = "data/users.json"


def save_to_json(data, path):
    with open(path, 'w') as outfile:
        json.dump(data, outfile)


def update_users_data(users, users_posts_dict, users_comments_dict):
    for u_dict in users:
        user_id = u_dict['_id']
        u_dict['posts_id'] = users_posts_dict[user_id]
        u_dict['comments'] = users_comments_dict[user_id]


def generate_data():
    users_id_list, users = gen_raw_users(USERS_QTY)
    posts, users_posts_dict, users_comments_dict = gen_posts_list(users_id_list, POSTS_QTY)
    update_users_data(users, users_posts_dict, users_comments_dict)

    save_to_json(posts, POSTS_PATH)
    save_to_json(users, USERS_PATH)


if __name__ == "__main__":
    generate_data()
