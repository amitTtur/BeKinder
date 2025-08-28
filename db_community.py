import sqlite3
from community_place import CommunityPlace
from user import User
from consts import *

# The search_community_place function returns a tuple,
# these are the indexes of the communities table data inside the tuple:
INDEX_ID = 0
INDEX_NAME = 1
INDEX_DESCRIPTION = 2
INDEX_PICTURE_PATH = 3

def convert_tuple_to_object(data):
    """
    converts a data tuple to an object initialized with said data
    :param data: a data tuple
    :return: a CommunityPlace object initialized with said data
    """

    com_place = CommunityPlace(
        data[INDEX_NAME],
        data[INDEX_DESCRIPTION],
        data[INDEX_PICTURE_PATH],
        data[INDEX_ID]
    )

    return com_place


def init_db():
    """
    this initializes the database and creates the table, only use this if this is the first time working with this database
    :return: None
    """

    open(DB_COMMUNITY_PATH, 'a').close()
    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        cur.execute("""CREATE TABLE communities 
                    (id INTEGER PRIMARY KEY AUTOINCREMENT,
                     name TEXT NOT NULL,
                     description TEXT NOT NULL,
                     picture_path TEXT NOT NULL)""")


def add_community_place(community_place: CommunityPlace):
    """
    Adds a new community place into the database
    :param community_place: the community place being added
    :return: None
    """

    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        params = (community_place.get_name(), community_place.get_description(), community_place.get_picture_path())
        cur.execute(f"""INSERT INTO communities (name, description, picture_path) VALUES (?, ?, ?)""", params)


def search_community_place(name, description):
    """
    locates the community place in the database by its name and description
    :param name: the name of the community place, type string
    :param description: the password of the user, type string
    :return: the community place that was found, if community place was not found then returns None
    """

    result = None
    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        params = (name, description)

        cur.execute(f'SELECT * FROM communities WHERE name == ? AND description == ?', params)
        result = cur.fetchone()

        return convert_tuple_to_object(result)


def search_community_place_by_id(id):
    """
    locates the community place in the database by its id
    :param id: the id of the community place, type int
    :return: the community place that was found, if community place was not found then returns None
    """

    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        params = (id,)

        cur.execute(f'SELECT * FROM communities WHERE id == ?', params)
        result = cur.fetchone()

        return convert_tuple_to_object(result)


def search_community_place_by_name(com_name):
    """
    locates the community place in the database by its id
    :param com_name: the name of the community place, type string
    :return: the community place that was found, if community place was not found then returns None
    """

    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        params = (com_name,)

        cur.execute(f'SELECT * FROM communities WHERE name == ?', params)
        result = cur.fetchone()

        return convert_tuple_to_object(result)


def get_all():
    """
    gets all the community places from the communities table
    :return: a list of CommunityPlace objects
    """

    list_com_place = []
    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM communities")
        result = cur.fetchall()

        for row in result:
            com_place = convert_tuple_to_object(row)
            list_com_place.append(com_place)

    return list_com_place


def get_communities_by_user(user: User):
    """
    gets a list of communities from the database that belong to the user
    :param user: a user object
    :return: a list of CommunityPlace objects
    """

    list_com_place = []
    with sqlite3.connect(DB_COMMUNITY_PATH) as conn:
        cur = conn.cursor()
        id_list = user.get_places().split("_")
        id_list = [int(x) for x in id_list]

        for id in id_list:
            cur.execute("SELECT * FROM communities WHERE id == ?", (id,))
            result = cur.fetchone()
            list_com_place.append(convert_tuple_to_object(result))

    return list_com_place
