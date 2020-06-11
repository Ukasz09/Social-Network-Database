from collections import defaultdict

import app.utils as utils
import shortuuid
import random

SENTENCES_CSV = "data/csv/sentences.csv"

sentences = utils.csv_data_to_list(SENTENCES_CSV, data_columns=0)


def gen_comment(users_comments_dict, post_id):
    user_id = utils.rand_elem(list(users_comments_dict.keys()))
    comment_id = shortuuid.uuid()
    user_comments = users_comments_dict[user_id]
    add_to_comments_list(user_comments, comment_id, post_id)
    comment = {
        'comment_id': comment_id,
        'user_id': user_id,
        'content': utils.rand_elem(sentences)
    }
    return comment


def add_to_comments_list(comments_list, comment_id, post_id):
    for com_dict in comments_list:
        if com_dict['post_id'] == post_id:
            com_dict['comments_id'].append(comment_id)
            return
    comments_list.append({'post_id': post_id, 'comments_id': [comment_id]})


def gen_comments_list(user_comments_dict, post_id, qty):
    return [gen_comment(user_comments_dict, post_id) for _ in range(qty)]


def gen_post(user_comments_dict, user_posts_dict, max_comments_qty=15):
    post_id = shortuuid.uuid()
    user_id = utils.rand_elem(list(user_comments_dict.keys()))
    user_posts_dict[user_id].append(post_id)
    comments_qty = random.randint(0, max_comments_qty)
    return {
        '_id': post_id,
        'user_id': user_id,
        'content': utils.rand_elem(sentences),
        'comments': gen_comments_list(user_comments_dict, post_id, comments_qty)
    }


def gen_posts_list(user_id_list, qty):
    users_posts_dict = {id: [] for id in user_id_list}
    users_comments_dict = {id: [] for id in user_id_list}
    posts = [gen_post(users_comments_dict, users_posts_dict) for _ in range(qty)]
    return posts, users_posts_dict, users_comments_dict
