import sqlite3
from user import User
from consts import *

# The login_user function returns a tuple,
# these are the indexes of the users table data inside the tuple:
INDEX_USERNAME = 0
INDEX_PASSWORD = 1
INDEX_PHONE_NUM = 2
INDEX_HOURS = 3
INDEX_MAX_HOURS = 4
INDEX_PLACES = 5


def convert_tuple_to_object(data):
    """
    converts a data tuple to an object initialized with said data
    :param data: a data tuple
    :return: a CommunityPlace object initialized with said data
    """

    user = User(
        data[INDEX_USERNAME],
        data[INDEX_PASSWORD],
        data[INDEX_PHONE_NUM],
        data[INDEX_HOURS],
        data[INDEX_MAX_HOURS],
        data[INDEX_PLACES]
    )

    return user


def init_db():
    """
    this initializes the database and creates the table,\n only use this if this is the first time working with this database
    :return: None
    """

    open(DB_USERS_PATH, 'a').close()
    with sqlite3.connect(DB_USERS_PATH) as conn:
        cur = conn.cursor()
        cur.execute("""CREATE TABLE users 
                    (username TEXT NOT NULL,
                     password TEXT NOT NULL,
                     phone_num TEXT NOT NULL,
                     hours INTEGER,
                     max_hours_in_place INTEGER,
                     num_places TEXT)""")


def register_user(user: User):
    """
    Adds a new user into the database
    :param user: the user being added
    :return: boolean value representing if register went successfully
    """

    is_success = True
    with sqlite3.connect(DB_USERS_PATH) as conn:
        cur = conn.cursor()
        params = (user.get_username(), user.get_password(), user.get_phone_num(), user.get_hours(), user.get_max_hours(), user.get_places())

        result = cur.execute("""SELECT * FROM users WHERE username=?""", (user.get_username(),))
        if len(result.fetchall()) == 0:
            cur.execute(f"""INSERT INTO users VALUES (?, ?, ?, ?, ?, ?)""", params)
        else:
            is_success = False

    return is_success


def login_user(username, password):
    """
    locates the user in the database by its username and password
    :param username: the username of the user, type string
    :param password: the password of the user, type string
    :return: the user the was found, if user was not found then returns None
    """

    with sqlite3.connect(DB_USERS_PATH) as conn:
        cur = conn.cursor()
        params = (username, password)

        cur.execute(f'SELECT * FROM users WHERE username == ? AND password == ?', params)
        result = cur.fetchone()
        return convert_tuple_to_object(result)


def get_user_by_username(username):
    """
        locates the user in the database by its username
        :param username: the username of the user, type string
        :return: the user the was found, if user was not found then returns None
        """

    with sqlite3.connect(DB_USERS_PATH) as conn:
        cur = conn.cursor()
        params = (username, )

        cur.execute(f'SELECT * FROM users WHERE username == ?', params)
        result = cur.fetchone()
        return convert_tuple_to_object(result)


def get_all():
    """
    gets all the users from the users table
    :return: a list of User objects
    """

    list_users = []
    with sqlite3.connect(DB_USERS_PATH) as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM users")
        result = cur.fetchall()

        for row in result:
            user = convert_tuple_to_object(row)
            list_users.append(user)

    return list_users