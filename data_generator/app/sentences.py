from mechanize import Browser
from bs4 import BeautifulSoup
import csv
import app.utils as utils

browser = Browser()
CSV_PATH = "app/data/csv/sentences.csv"
CSV_DELIMITER = ","


def get_random_sentence():
    browser.open("https://sentence-generator.appspot.com")
    soup = BeautifulSoup(browser.response().read(), features="html5lib")
    badges = soup.body.find('p', attrs={'class': 'lead'})
    return badges.contents[0]


def make_sentences_list(qty):
    sentences = set()
    for i in range(qty):
        sentences.add(get_random_sentence())
    return sentences


def write_as_csv(data_list):
    csv_file = utils.get_csv_write_file(CSV_PATH)
    csv_writer = csv.writer(csv_file, delimiter=CSV_DELIMITER)
    for row in data_list:
        csv_writer.writerow(row)
    csv_file.close()


def generate_sentences(qty):
    """
    Bloating operation. Use reasonable
    :param qty:
    :return:
    """
    sentences = make_sentences_list(qty)
    write_as_csv([[s] for s in sentences])
