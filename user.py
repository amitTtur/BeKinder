class User:
    """
    This class represents a user in the app and includes all the details about a specific user
    """

    def __init__(self, username, password, phone_num, hours=0, max_hours_in_place=0, places=None):
        """
        The initialization function
        :param username: the username of the user, type string
        :param password: the password of the user, type string
        :param phone_num: the phone number of the user, type string
        :param hours: the hours the user did community service, type int
        :param max_hours_in_place: the max hours the user did in any place, type int
        :param places: the places the user did community service, type string of format KEY_KEY_KEY...
        """

        self.username = username
        self.password = password
        self.phone_num = phone_num
        self.hours = hours
        self.max_hours_in_place = max_hours_in_place
        self.places = places


    def set_username(self, username):
        self.username = username

    def set_password(self, password):
        self.password = password

    def set_phone_num(self, phone_num):
        self.phone_num = phone_num

    def set_hours(self, hours):
        self.hours = hours

    def set_max_hours(self, max_hours):
        self.max_hours_in_place = max_hours

    def set_places(self, places):
        self.places = places

    def get_username(self):
        return self.username

    def get_password(self):
        return self.password

    def get_phone_num(self):
        return self.phone_num

    def get_hours(self):
        return self.hours

    def get_max_hours(self):
        return self.max_hours_in_place

    def get_places(self) -> str:
        return self.places