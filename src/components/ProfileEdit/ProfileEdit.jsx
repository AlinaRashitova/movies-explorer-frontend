import "./ProfileEdit.css";

const ProfileEdit = () => {
  return (
    <section className="profile-edit">
      <form className="profile-edit__form">
        <div className="profile-edit__inputs-container">
          <fieldset className="profile-edit__input-container">
            <label
              htmlFor="name"
              className="profile-edit__input-label"
            >
              Имя
            </label>
            <input
              type="text"
              className="profile-edit__input"
              required="true"
              id="name"
              name="name"
              value="Виталий"
              minLength="2"
              maxLength="20"
              placeholder="Имя" />
          </fieldset>
          <span className="profile-edit__input-error-message"></span>
          <fieldset className="profile-edit__input-container">
            <label
              htmlFor="email"
              className="profile-edit__input-label"
            >
              E-mail
            </label>
            <input
              type="email"
              className="profile-edit__input"
              required="true"
              id="email"
              name="email"
              value="pochta@yandex.ru"
              placeholder="Email" />
          </fieldset>
          <span className="profile-edit__input-error-message"></span>
        </div>
        <button
          type="submit"
          className="profile-edit__button"
        >
          Редактировать
        </button>
      </form>
    </section>
  )
}

export default ProfileEdit
