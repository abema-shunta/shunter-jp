var c, caltivate, calucuration, genPathData, getWindowSize, gx, gy, initializeUI, move, updateColumn, updateRow, updateTableByDecreaceCol, updateTableByDecreaceRow, updateTableByIncreaceCol, updateTableByIncreaceRow, updateUI, _;

_ = window.global = {};

_.MAX = 10;

_.MIN = 3;

_.HEADER_SIZE = 120;

_.BUTTON_SIZE = 30;

_.LABEL_SIZE = 40;

_.BUTTON_MARGIN = 10;

_.TOP = _.HEADER_SIZE + _.BUTTON_SIZE + _.BUTTON_MARGIN;

_.COL = 4;

_.ROW = 4;

_.COLOR = ["#000", "#000", "#0FF", "#F30", "#6F0", "#FF0", "#F90", "#09F", "#90F", "#309", "#000"];

_.ANOTHER_COLOR = ["#FF0", "#FF0", "#F30", "#6F0", "#F30", "#6F0", "#F30", "#6F0", "#F30", "#6F0"];

c = function(dat) {
  return console.log(dat);
};

caltivate = function(num) {
  num = num >= _.MAX ? _.MAX : num;
  num = num <= _.MIN ? _.MIN : num;
  return num;
};

(getWindowSize = function() {
  var d, e, g, w;
  w = window;
  d = document;
  e = d.documentElement;
  g = d.getElementsByTagName('body')[0];
  _.WIDTH = w.innerWidth || e.clientWidth || g.clientWidth;
  return _.HEIGHT = w.innerHeight || e.clientHeight || g.clientHeight;
})();

genPathData = function(answer) {
  var a, pathdata, source, target, _i, _len;
  pathdata = [];
  source = null;
  target = null;
  for (_i = 0, _len = answer.length; _i < _len; _i++) {
    a = answer[_i];
    target = a;
    if (source !== null) {
      pathdata.push({
        source: source,
        target: target
      });
    }
    source = a;
  }
  return pathdata;
};

gx = function(num) {
  return ((num % _.COL) + 0.5) * _.SQUARE_SIZE;
};

gy = function(num) {
  return (parseInt(num / _.COL) + 0.5) * _.SQUARE_SIZE;
};

move = function(pos, m) {
  var res, x, y;
  if (_.VISITED[pos] === true) {
    return false;
  }
  _.VISITED[pos] = true;
  if (m === _.ANSWER_LENGTH) {
    _.ANSWER.unshift(pos);
    _.VISITED[pos] = true;
    return true;
  } else {
    res = false;
    x = pos % _.COL;
    y = parseInt(pos / _.COL);
    if (x - 2 >= 0) {
      if (y - 1 >= 0) {
        res = res || move((y - 1) * _.COL + x - 2, m + 1);
      }
      if (y + 1 < _.ROW) {
        res = res || move((y + 1) * _.COL + x - 2, m + 1);
      }
    }
    if (x + 2 < _.COL) {
      if (y - 1 >= 0) {
        res = res || move((y - 1) * _.COL + x + 2, m + 1);
      }
      if (y + 1 < _.ROW) {
        res = res || move((y + 1) * _.COL + x + 2, m + 1);
      }
    }
    if (y - 2 >= 0) {
      if (x - 1 >= 0) {
        res = res || move((y - 2) * _.COL + x - 1, m + 1);
      }
      if (x + 1 < _.COL) {
        res = res || move((y - 2) * _.COL + x + 1, m + 1);
      }
    }
    if (y + 2 < _.ROW) {
      if (x - 1 >= 0) {
        res = res || move((y + 2) * _.COL + x - 1, m + 1);
      }
      if (x + 1 < _.COL) {
        res = res || move((y + 2) * _.COL + x + 1, m + 1);
      }
    }
    if (res === true) {
      _.ANSWER.unshift(pos);
      return true;
    } else {
      _.VISITED[pos] = false;
      return false;
    }
  }
};

calucuration = function() {
  var data_table, i, t, _i, _len, _ref;
  data_table = "";
  _ref = _.TABLE;
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    t = _ref[i];
    data_table += "" + (t ? 1 : 0);
  }
  c("table=" + data_table + "&start=" + _.START + "&row=" + _.ROW + "&col=" + _.COL);
  return _.ANSWER = $.ajax({
    type: "GET",
    url: "https://knight-tour-server.herokuapp.com/answer.json",
    data: "table=" + data_table + "&start=" + _.START + "&row=" + _.ROW + "&col=" + _.COL,
    success: (function(msg) {
      var $button;
      $button = $("#Execution");
      _.ANSWER = msg.answer;
      $button.text("CLEAR");
      $button.addClass("calucurated");
      return updateUI();
    })
  });
};

updateUI = function() {
  $("body").css("background", "" + _.COLOR[_.COL - 1]);
  _.SQUARE_SIZE = _.WIDTH / (2 * _.COL);
  _.CHESS_WIDTH = _.SQUARE_SIZE * _.COL;
  _.CHESS_HEIGHT = _.SQUARE_SIZE * _.ROW;
  $("#ChessTable").css({
    width: "" + _.CHESS_WIDTH + "px",
    height: "" + _.CHESS_HEIGHT + "px",
    top: "" + _.TOP + "px",
    left: "" + (_.WIDTH / 4) + "px"
  });
  $("#Help").css({
    top: "" + (_.TOP + _.CHESS_HEIGHT) + "px"
  });
  $("#ColDecrease").css({
    top: "" + _.HEADER_SIZE + "px",
    left: "" + (_.WIDTH / 4) + "px"
  });
  $("#ColIncrease").css({
    top: "" + _.HEADER_SIZE + "px",
    left: "" + (_.WIDTH * 3 / 4 - _.BUTTON_SIZE) + "px"
  });
  $("#ColNumber").css({
    top: "" + _.HEADER_SIZE + "px",
    left: "" + (_.WIDTH / 2 - _.LABEL_SIZE / 2) + "px"
  });
  $("#RowDecrease").css({
    top: "" + _.TOP + "px",
    left: "" + (_.WIDTH / 4 - _.BUTTON_SIZE - _.BUTTON_MARGIN) + "px"
  });
  $("#RowIncrease").css({
    top: "" + (_.TOP + _.CHESS_HEIGHT - _.BUTTON_SIZE) + "px",
    left: "" + (_.WIDTH / 4 - _.BUTTON_SIZE - _.BUTTON_MARGIN) + "px"
  });
  $("#RowNumber").css({
    top: "" + (_.TOP + _.CHESS_HEIGHT / 2 - _.LABEL_SIZE / 2) + "px",
    left: "" + (_.WIDTH / 4 - _.LABEL_SIZE) + "px"
  });
  _.SVG.attr("width", _.CHESS_WIDTH).attr("height", _.CHESS_HEIGHT);
  _.RECT = _.RECT.data(_.TABLE);
  _.RECT.enter().append("rect").on("dblclick", function(d, i) {
    c("clidked");
    _.START = i;
    return updateUI();
  }).on("click", function(d, i) {
    _.TABLE[i] = !_.TABLE[i];
    return updateUI();
  });
  _.RECT.attr("width", function(d) {
    return _.SQUARE_SIZE;
  }).attr("height", function(d) {
    return _.SQUARE_SIZE;
  }).attr("x", function(d, i) {
    return (i % _.COL) * _.SQUARE_SIZE;
  }).attr("y", function(d, i) {
    return parseInt(i / _.COL) * _.SQUARE_SIZE;
  }).attr("fill", function(d) {
    return "#FFF";
  }).attr("opacity", function(d) {
    if (d) {
      return "1.0";
    } else {
      return "0.1";
    }
  }).attr("stroke", function(d) {
    return "" + _.COLOR[_.COL - 1];
  }).attr("stroke-width", "2px");
  _.RECT.exit().remove();
  _.START_MARKER = _.START_MARKER.data([_.START]);
  _.START_MARKER.enter().append("rect");
  _.START_MARKER.attr("width", function(d) {
    return _.SQUARE_SIZE - 10;
  }).attr("height", function(d) {
    return _.SQUARE_SIZE - 10;
  }).attr("x", function(d) {
    return ((d % _.COL) * _.SQUARE_SIZE) + 5;
  }).attr("y", function(d) {
    return (parseInt(d / _.COL) * _.SQUARE_SIZE) + 5;
  }).attr("fill", "none").attr("stroke", "" + _.ANOTHER_COLOR[_.COL - 1]).attr("stroke-width", "10px");
  _.START_MARKER.exit().remove();
  _.ANSWER_LINE = _.ANSWER_LINE.data(genPathData(_.ANSWER));
  _.ANSWER_LINE.enter().append("path");
  _.ANSWER_LINE.attr("style", function(d) {
    return "stroke: " + _.ANOTHER_COLOR[_.COL - 1] + "; stroke-width: 5px; opacity: 0.7;";
  }).attr("d", function(d) {
    return "M" + (gx(d.source)) + "," + (gy(d.source)) + "L" + (gx(d.target)) + "," + (gy(d.target));
  });
  _.ANSWER_LINE.exit().remove();
  _.ANSWER_CIRCLE = _.ANSWER_CIRCLE.data(_.ANSWER);
  _.ANSWER_CIRCLE.enter().append("circle");
  _.ANSWER_CIRCLE.attr("r", function(d) {
    return _.SQUARE_SIZE / 4;
  }).attr("cx", function(d, i) {
    return gx(d);
  }).attr("cy", function(d, i) {
    return gy(d);
  }).attr("style", function(d) {
    return "fill: " + _.ANOTHER_COLOR[_.COL - 1] + "; stroke-width: 0px;";
  });
  _.ANSWER_CIRCLE.exit().remove();
  _.ANSWER_TEXT = _.ANSWER_TEXT.data(_.ANSWER);
  _.ANSWER_TEXT.enter().append("text");
  _.ANSWER_TEXT.attr("width", function(d) {
    return _.SQUARE_SIZE - 10;
  }).attr("height", function(d) {
    return _.SQUARE_SIZE - 10;
  }).attr("x", function(d, i) {
    return gx(d);
  }).attr("y", function(d, i) {
    return gy(d);
  }).text(function(d, i) {
    return i + 1;
  });
  _.ANSWER_TEXT.exit().remove();
};

(updateColumn = function() {
  $("#ColNumber").text(_.COL);
  if (_.COL === _.MIN) {
    return $("#ColDecrease").addClass("disabled");
  } else if (_.COL === _.MAX) {
    return $("#ColIncrease").addClass("disabled");
  } else {
    $("#ColIncrease").removeClass();
    return $("#ColDecrease").removeClass();
  }
})();

(updateRow = function() {
  $("#RowNumber").text(_.ROW);
  if (_.ROW === _.MIN) {
    return $("#RowDecrease").addClass("disabled");
  } else if (_.ROW === _.MAX) {
    return $("#RowIncrease").addClass("disabled");
  } else {
    $("#RowIncrease").removeClass();
    return $("#RowDecrease").removeClass();
  }
})();

updateTableByIncreaceCol = function() {
  var PCOL, TEMP, i, length, row, t, _i, _j, _len, _ref;
  TEMP = [];
  length = (_.COL * _.ROW) - 1;
  c(length);
  for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
    TEMP[i] = true;
  }
  PCOL = _.COL - 1;
  _ref = _.TABLE;
  for (i = _j = 0, _len = _ref.length; _j < _len; i = ++_j) {
    t = _ref[i];
    row = parseInt(i / PCOL);
    TEMP[i + row] = _.TABLE[i];
  }
  return _.TABLE = TEMP;
};

updateTableByDecreaceCol = function() {
  var PCOL, TEMP, i, length, row, _i, _j;
  TEMP = [];
  length = (_.COL * _.ROW) - 1;
  c(length);
  for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
    TEMP[i] = true;
  }
  PCOL = _.COL + 1;
  for (i = _j = 0; 0 <= length ? _j <= length : _j >= length; i = 0 <= length ? ++_j : --_j) {
    row = parseInt(i / PCOL);
    TEMP[i - row] = _.TABLE[i];
  }
  return _.TABLE = TEMP;
};

updateTableByIncreaceRow = function() {
  var TEMP, i, length, t, _i, _j, _len, _ref;
  TEMP = [];
  length = (_.COL * _.ROW) - 1;
  c(length);
  for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
    TEMP[i] = true;
  }
  _ref = _.TABLE;
  for (i = _j = 0, _len = _ref.length; _j < _len; i = ++_j) {
    t = _ref[i];
    TEMP[i] = t;
  }
  return _.TABLE = TEMP;
};

updateTableByDecreaceRow = function() {
  var TEMP, i, length, _i;
  TEMP = [];
  length = (_.COL * _.ROW) - 1;
  c(length);
  for (i = _i = 0; 0 <= length ? _i <= length : _i >= length; i = 0 <= length ? ++_i : --_i) {
    TEMP[i] = _.TABLE[i];
  }
  return _.TABLE = TEMP;
};

(initializeUI = function() {
  var i, j, _i, _j, _ref, _ref1;
  _.TABLE = [];
  _.ANSWER = [];
  _.START = 0;
  for (i = _i = 1, _ref = _.COL; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
    for (j = _j = 1, _ref1 = _.ROW; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
      _.TABLE.push(true);
    }
  }
  _.SVG = d3.select("#ChessTable").append("svg");
  _.RECT_GROUP = _.SVG.append("g").attr("id", "Rects");
  _.START_GROUP = _.SVG.append("g").attr("id", "StartGroup");
  _.ANSWER_GROUP = _.SVG.append("g").attr("id", "AnswerGroup");
  _.RECT = _.RECT_GROUP.selectAll("rect");
  _.START_MARKER = _.START_GROUP.selectAll("rect");
  _.ANSWER_LINE = _.ANSWER_GROUP.selectAll("path");
  _.ANSWER_CIRCLE = _.ANSWER_GROUP.selectAll("circle");
  _.ANSWER_TEXT = _.ANSWER_GROUP.selectAll("text");
  updateUI();
  $("#ColIncrease").click(function() {
    var needsUpdateCol, needsUpdateRow;
    needsUpdateCol = _.COL !== _.MAX;
    needsUpdateRow = _.ROW !== _.MAX;
    _.COL = caltivate(_.COL + 1);
    _.ROW = caltivate(_.ROW + 1);
    if (needsUpdateCol) {
      updateTableByIncreaceCol();
    } else if (needsUpdateRow) {
      updateTableByIncreaceRow();
    }
    updateColumn();
    updateRow();
    return updateUI();
  });
  $("#ColDecrease").click(function() {
    var needsUpdateCol, needsUpdateRow;
    needsUpdateCol = _.COL !== _.MIN;
    needsUpdateRow = _.ROW !== _.MAX;
    _.COL = caltivate(_.COL - 1);
    _.ROW = caltivate(_.ROW - 1);
    if (needsUpdateCol) {
      updateTableByDecreaceCol();
    } else if (needsUpdateRow) {
      updateTableByDecreaceRow();
    }
    updateColumn();
    updateRow();
    return updateUI();
  });
  $("#RowIncrease").click(function() {
    _.ROW = caltivate(_.ROW + 1);
    updateTableByIncreaceRow();
    updateRow();
    return updateUI();
  });
  $("#RowDecrease").click(function() {
    _.ROW = caltivate(_.ROW - 1);
    updateTableByDecreaceRow();
    updateRow();
    return updateUI();
  });
  return $("#Execution").click(function() {
    var $button;
    $button = $(this);
    if ($button.hasClass("calucurated")) {
      _.ANSWER = [];
      $button.text("CALC");
      $button.removeClass("calucurated");
      return updateUI();
    } else {
      return calucuration();
    }
  });
})();

window.onresize = function() {
  getWindowSize();
  return updateUI();
};
