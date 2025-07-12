const db = require("../utils/databaseUtils");

module.exports = class Favourites {

  static addtofavourite(homeid) {
    return Favourites.getfavourite().then(([favourites]) => {
      const isFavourite = favourites.some((fav) => fav.id === Number(homeid));
      if (isFavourite) {
        return Promise.resolve()
      }else {
        return db.execute("insert into Favourites (id) values (?)", [homeid]);
      }
    });
  }

  static getfavourite() {
    return db.execute("select * from Favourites");
  }

  static RemoveFavourite(homeid) {
    return db.execute("delete from Favourites where id = ?", [homeid]);
  }
};
