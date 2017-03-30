
function NavBarCtrl($scope) {
    $scope.isCollapsed = true;
}

function randomnumber(limite) {
    return Math.ceil(Math.random() * limite);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.sum = function() {
    var total = 0;
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i];
    }
    return total;
};

function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
