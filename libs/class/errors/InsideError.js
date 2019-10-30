var InsideError = {
    create: function (errObj) {
        InsideError.toBol = true;
        InsideError.err = errObj;
        InsideError.type = "Ошибка в проекте";
        InsideError.text = "Произошла ошибка во время работы нашего сервиса, просим незамедлительно обратиться к администратору и стараться меньше выполнять действий, повлекших за собой данные неполадки, пока мы не исправим ситуацию.";
    }
};
module.exports = InsideError;