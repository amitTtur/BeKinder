import sqlite3
from consts import *

def init():
    open(DB_COM_USER, 'a').close()
    with sqlite3.connect(DB_COM_USER) as conn:
        cur = conn.cursor()
        cur.execute("""CREATE TABLE com_user 
                        (username TEXT NOT NULL,
                         placename TEXT NOT NULL)""")


def add(username, placename):
    with sqlite3.connect(DB_COM_USER) as conn:
        cur = conn.cursor()
        params = (username, placename)
        cur.execute("""INSERT INTO com_user (username, placename) VALUES (?, ?)""", params)


def get(username):
    with sqlite3.connect(DB_COM_USER) as conn:
        cur = conn.cursor()
        cur.execute("""SELECT FROM com_user WHERE username == ?""", (username,))
        result = cur.fetchone()
        return result[1]

def update(username, new_place):
    with sqlite3.connect(DB_COM_USER) as conn:
        cur = conn.cursor()
        cur.execute("""SELECT * FROM com_user WHERE username == ?""", (username, ))
        places = cur.fetchone()[1]
        places = places + "_" + new_place
        cur.execute("""INSERT INTO com_user WHERE username == ? VALUES (?, ?)""", (username, username, places))