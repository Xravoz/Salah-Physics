const counters = document.querySelectorAll(".count");
const speed = 200;
const startCounters = () => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const target = parseInt(+counter.getAttribute("data-target"));
      const count = parseInt(+counter.innerText);
      const increment = Math.trunc(target / speed);
      if (count < target) {
          counter.innerText = count + increment;
        setTimeout(updateCount, 1);
      } else {
        count.innerText = target;
      }
    };
    updateCount();
  });
}

window.addEventListener('scroll', startCounters, {
  once: true
});
/* COPY INPUT VALUES TO CARD MOCKUP */
const bounds = document.querySelectorAll("[data-bound]");

for (let i = 0; i < bounds.length; i++) {
  const targetId = bounds[i].getAttribute("data-bound");
  const defValue = bounds[i].getAttribute("data-def");
  const targetEl = document.getElementById(targetId);
  bounds[i].addEventListener(
    "blur",
    () => (targetEl.innerText = bounds[i].value || defValue)
  );
}

/* TOGGLE CVC DISPLAY MODE */
const cvc_toggler = document.getElementById("cvc_toggler");

cvc_toggler.addEventListener("click", () => {
  const target = cvc_toggler.getAttribute("data-target");
  const el = document.getElementById(target);
  el.setAttribute("type", el.type === "text" ? "password" : "text");
});

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

$(function () {
  $("#cardNumber").on("keyup", function (e) {
    var val = $(this).val();
    var newval = "";
    val = val.replace(/\s/g, "");
    for (var i = 0; i < val.length; i++) {
      if (i % 4 == 0 && i > 0) newval = newval.concat(" ");
      newval = newval.concat(val[i]);
    }
    $(this).val(newval);
  });

  $(".year-own").datepicker({
    minViewMode: 2,
    format: "yyyy"
  });

  $(".month-own").datepicker({
    format: "MM",
    minViewMode: "months",
    maxViewMode: "months",
    startView: "months"
  });
});
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _creditCardType = __webpack_require__(2);

	var _creditCardType2 = _interopRequireDefault(_creditCardType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(document).on('input change', '#input--cc input', function () {
	  var ccNum = $(this).val();
	  var ccType = (0, _creditCardType2.default)(ccNum);

	  if (!ccNum.length || typeof ccType === "undefined" || !ccType.length) {
	    $('#input--cc').removeClass().addClass('creditcard-icon');
	    return;
	  }

	  var creditcardType = ccType[0].type;

	  var ccTypes = {
	    'american-express': 'AE',
	    'master-card': 'MC',
	    'visa': 'VI',
	    'discover': 'DI'
	  };

	  $('#input--cc').removeClass().addClass('creditcard-icon').addClass('creditcard-icon--' + creditcardType); //set creditcard icon

	  // select creditcard type
	  $(".creditcard-type > select").val(ccTypes[creditcardType]);
	  // set the creditcard type <select> to the value entered
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var types = {};
	var VISA = 'visa';
	var MASTERCARD = 'master-card';
	var AMERICAN_EXPRESS = 'american-express';
	var DINERS_CLUB = 'diners-club';
	var DISCOVER = 'discover';
	var JCB = 'jcb';
	var UNIONPAY = 'unionpay';
	var MAESTRO = 'maestro';
	var CVV = 'CVV';
	var CID = 'CID';
	var CVC = 'CVC';
	var CVN = 'CVN';
	var testOrder = [
	  VISA,
	  MASTERCARD,
	  AMERICAN_EXPRESS,
	  DINERS_CLUB,
	  DISCOVER,
	  JCB,
	  UNIONPAY,
	  MAESTRO
	];

	function clone(x) {
	  var prefixPattern, exactPattern, dupe;

	  if (!x) { return null; }

	  prefixPattern = x.prefixPattern.source;
	  exactPattern = x.exactPattern.source;
	  dupe = JSON.parse(JSON.stringify(x));
	  dupe.prefixPattern = prefixPattern;
	  dupe.exactPattern = exactPattern;

	  return dupe;
	}

	types[VISA] = {
	  niceType: 'Visa',
	  type: VISA,
	  prefixPattern: /^4$/,
	  exactPattern: /^4\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [16],
	  code: {
	    name: CVV,
	    size: 3
	  }
	};

	types[MASTERCARD] = {
	  niceType: 'MasterCard',
	  type: MASTERCARD,
	  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27[0-1]|2720)$/,
	  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [16],
	  code: {
	    name: CVC,
	    size: 3
	  }
	};

	types[AMERICAN_EXPRESS] = {
	  niceType: 'American Express',
	  type: AMERICAN_EXPRESS,
	  prefixPattern: /^(3|34|37)$/,
	  exactPattern: /^3[47]\d*$/,
	  isAmex: true,
	  gaps: [4, 10],
	  lengths: [15],
	  code: {
	    name: CID,
	    size: 4
	  }
	};

	types[DINERS_CLUB] = {
	  niceType: 'Diners Club',
	  type: DINERS_CLUB,
	  prefixPattern: /^(3|3[0689]|30[0-5])$/,
	  exactPattern: /^3(0[0-5]|[689])\d*$/,
	  gaps: [4, 10],
	  lengths: [14],
	  code: {
	    name: CVV,
	    size: 3
	  }
	};

	types[DISCOVER] = {
	  niceType: 'Discover',
	  type: DISCOVER,
	  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
	  exactPattern: /^(6011|65|64[4-9])\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [16, 19],
	  code: {
	    name: CID,
	    size: 3
	  }
	};

	types[JCB] = {
	  niceType: 'JCB',
	  type: JCB,
	  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
	  exactPattern: /^(2131|1800|35)\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [16],
	  code: {
	    name: CVV,
	    size: 3
	  }
	};

	types[UNIONPAY] = {
	  niceType: 'UnionPay',
	  type: UNIONPAY,
	  prefixPattern: /^(6|62)$/,
	  exactPattern: /^62\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [16, 17, 18, 19],
	  code: {
	    name: CVN,
	    size: 3
	  }
	};

	types[MAESTRO] = {
	  niceType: 'Maestro',
	  type: MAESTRO,
	  prefixPattern: /^(5|5[06-9]|6\d*)$/,
	  exactPattern: /^5[06-9]\d*$/,
	  gaps: [4, 8, 12],
	  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
	  code: {
	    name: CVC,
	    size: 3
	  }
	};

	function creditCardType(cardNumber) {
	  var type, value, i;
	  var prefixResults = [];
	  var exactResults = [];

	  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
	    return [];
	  }

	  for (i = 0; i < testOrder.length; i++) {
	    type = testOrder[i];
	    value = types[type];

	    if (cardNumber.length === 0) {
	      prefixResults.push(clone(value));
	      continue;
	    }

	    if (value.exactPattern.test(cardNumber)) {
	      exactResults.push(clone(value));
	    } else if (value.prefixPattern.test(cardNumber)) {
	      prefixResults.push(clone(value));
	    }
	  }

	  return exactResults.length ? exactResults : prefixResults;
	}

	creditCardType.getTypeInfo = function (type) {
	  return clone(types[type]);
	};

	creditCardType.types = {
	  VISA: VISA,
	  MASTERCARD: MASTERCARD,
	  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
	  DINERS_CLUB: DINERS_CLUB,
	  DISCOVER: DISCOVER,
	  JCB: JCB,
	  UNIONPAY: UNIONPAY,
	  MAESTRO: MAESTRO
	};

	module.exports = creditCardType;


/***/ }
/******/]);
$(document).ready(function() {
 
  $('.method').on('click', function() {
    $('.method').removeClass('blue-border');
    $(this).addClass('blue-border');
  });
 
})
var $cardInput = $('.input-fields input');
 
$('.next-btn').on('click', function(e) {
 
  $cardInput.removeClass('warning');
 
  $cardInput.each(function() {    
     var $this = $(this);
     if (!$this.val()) {
       $this.addClass('warning');
     }
  })
});

const form = document.querySelector('.form');
const name = document.getElementById('name');
const number = document.getElementById('number');
const date = document.getElementById('date');
const cvv = document.getElementById('cvv');

const visa = document.querySelector('.card');

/*  SHOW ERROR  */
function showError(element, error) {
    if(error === true) {
        element.style.opacity = '1';
    } else {
        element.style.opacity = '0';
    }
};

/*  CHANGE THE FORMAT NAME  */
name.addEventListener('input', function() {
    let alert1 = document.getElementById('alert-1');
    let error = this.value === '';
    showError(alert1, error);
    document.getElementById('card-name').textContent = this.value;
});

/*  CHANGE THE FORMAT CARD NUMBER*/
number.addEventListener('input', function(e) {
    this.value = numberAutoFormat();

    //show error when is different of 16 numbers and 3 white space
    let error = this.value.length !== 19;
    let alert2 = document.getElementById('alert-2');
    showError(alert2, error);

    document.querySelector('.card__number').textContent = this.value;
});

function numberAutoFormat() {
    let valueNumber = number.value;
    // if white space change to ''. If is not a number between 0-9 change to ''
    let v = valueNumber.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // the value got min of 4 digits and max of 16
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 4) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join(' ');
    } else {
        return valueNumber;
    }
};

/*  CHANGE THE FORMAT DATE  */
date.addEventListener('input', function(e) {
    this.value = dateAutoFormat();
    
    // show error if is not a valid date
    let alert3 = document.getElementById('alert-3');
    showError(alert3, isNotDate(this));

    let dateNumber = date.value.match(/\d{2,4}/g);
    document.getElementById('month').textContent = dateNumber[0];
    document.getElementById('year').textContent = dateNumber[1];
});

function isNotDate(element) {
    let actualDate = new Date();
    let month = actualDate.getMonth() + 1; // start january 0 we need to add + 1
    let year = Number(actualDate.getFullYear().toString().substr(-2)); // 2022 -> 22
    let dateNumber = element.value.match(/\d{2,4}/g);
    let monthNumber = Number(dateNumber[0]);
    let yearNumber = Number(dateNumber[1]);
    
    if(element.value === '' || monthNumber < 1 || monthNumber > 12 || yearNumber < year || (monthNumber <= month && yearNumber === year)) {
        return true;
    } else {
        return false;
    }
}

function dateAutoFormat() {
    let dateValue = date.value;
    // if white space -> change to ''. If is not a number between 0-9 -> change to ''
    let v = dateValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    // min of 2 digits and max of 4
    let matches = v.match(/\d{2,4}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (i = 0; i < match.length; i += 2) {
        // after 4 digits add a new element to the Array
        // e.g. "4510023" -> [4510, 023]
        parts.push(match.substring(i, i + 2));
    }

    if (parts.length) {
        // add a white space after 4 digits
        return parts.join('/');
    } else {
        return dateValue;
    }
};

/*  CHANGE THE FORMAT CVV  */
cvv.addEventListener('input', function(e) {
    let alert4 = document.getElementById('alert-4');
    let error = this.value.length < 3;
    showError(alert4, error)
});

/* CHECK IF KEY PRESSED IS A NUMBER (input of card number, date and cvv) */
function isNumeric(event) {
    if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode > 31)) {
        return false;
    }
};

/*  VALIDATION FORM WHEN PRESS THE BUTTON   */
form.addEventListener('submit', function (e) {
    // 1. if there is not any name
    // 2. if the length of the number card is not valid (16 numbers and 3 white space)
    // 3. if is not a valid date (4 number and "/" or is not a valid date)
    // 4. if is not a valid cvv

    if(name.value === '' || number.value.length !== 19 || date.value.length !== 5 || isNotDate(date) === true || cvv.value.length < 3) {
        e.preventDefault();
    };

    // 5. if any input is empty show the alert of that input
    let input = document.querySelectorAll('input');
    for( i = 0; i < input.length; i++) {
        if(input[i].value === '') {
            input[i].nextElementSibling.style.opacity = '1';
        }
    }
});


