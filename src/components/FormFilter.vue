<template>
    <form class="filter__form form" action="#" method="get">
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price" for="minPrice">
            <input class="form__input" type="text" name="min-price" value="0" >
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price" for="maxPrice">
            <input class="form__input" type="text" name="max-price" value="12345" >
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>
          <label class="form__label form__label--select" for="category">
            <select class="form__select" type="text" name="category" >
              <option value="value1">Все категории</option>
              <option value="value2">Футболки</option>
              <option value="value3">Бюстгалтеры</option>
              <option value="value4">Носки</option>
            </select>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Материал</legend>
          <ul class="check-list">
            <li class="check-list__item">
              <label class="check-list__label" for="material">
    <input class="check-list__check sr-only" type="checkbox" name="material" value="лен">
                <span class="check-list__desc">
                  лен
                  <span>(3)</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Коллекция</legend>
          <ul class="check-list">
            <li class="check-list__item">
              <label class="check-list__label" for="collection">
    <input class="check-list__check sr-only"
           type="checkbox" name="collection" value="лето" checked="">
                <span class="check-list__desc">
                  лето
                  <span>(2)</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <button class="filter__submit button button--primery" type="submit">
          Применить
        </button>
        <button class="filter__reset button button--second" type="button">
          Сбросить
        </button>
    </form>
</template>
