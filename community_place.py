class CommunityPlace:
    """
    This class is used to represent a community place in which a person can do service
    """

    def __init__(self, name, description, picture_path, id=None):
        """
        The initialization function com
        :param name: the name of the community place, type string
        :param description: the description of the community place, type string
        :param picture_path: the path of the picture of the community place
        :param id: the id of the community place, type int
        """

        self.name = name
        self.description = description
        self.picture_path = picture_path
        self.id = id

    def __str__(self):
        return f"name: {self.name}, description: {self.description}, picture_path: {self.picture_path}, id: {self.id}"

    def get_name(self):
        return self.name

    def get_description(self):
        return self.description

    def get_picture_path(self):
        return self.picture_path

    def set_name(self, name):
        self.name = name

    def set_description(self, description):
        self.description = description

    def set_picture_path(self, picture_path):
        self.picture_path = picture_path

