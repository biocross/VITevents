// MAIN NAVIGATION AND HISTORY ////////////////////////////////////////////////////////

var linkClicked = false;

$(function () {
    // Keeping track of history
    $(window).hashchange(function () {
        if (!linkClicked) {
            var hash = location.hash;
            var action = hash.replace('#', '');
            if (action.length > 0) {
                window.scrollTo(0, 0);
                $('#content-target').load('/Home/' + action, function (response, status, xhr) {
                    setActiveLink(action);
                    $('#content-target').fadeIn('300', function () {
                        //alert("Loading complete");
                    });
                });
            }
        }
        else {
            linkClicked = false;
        }
    });
});

$(document).ready(function () {
    var hash = location.hash;
    var action = hash.replace('#', '');
    switch (action) {
        case "home":
            $("#a_home").click();
            break;
        case "work":
            $("#a_work").click();
            break;
        case "about":
            $("#a_about").click();
            break;
        case "clients":
            $("#a_clients").click();
            break;
        case "news":
            $("#a_news").click();
            break;
        case "process":
            $("#a_process").click();
            break;
        case "contact":
            $("#a_contact").click();
            break;
        default:
            if (action.indexOf("project") != -1) {
                var projectId = action.substring(action.indexOf("/") + 1);
                projectDirectLink(projectId);
            } else {
                $("#a_home").click();
            }
            break;
    }
});

function projectDirectLink(projectId) {
    action = "work";
    $('#AJAXload').show();
    $('#content-target').load('/Home/' + action, function (response, status, xhr) {
        $('#content-target').waitForImages(function () {
            getProject(projectId, "right", "fade");
        });
    });
}

$("#a_logo").click(function () {
    linkClicked = true;
    $('#AJAXload').show();
    function complete() {
        window.location.hash = "home";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_home").click(function () {
    linkClicked = true;
    $('#AJAXload').show();
    function complete() {
        window.location.hash = "home";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_work").click(function () {
    linkClicked = true;
    $('#AJAXload').show();
    function complete() {
        window.location.hash = "work";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('500', function () {
                    $('#AJAXload').hide();
                    // Loading complete
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_about").click(function () {
    linkClicked = true;
    $('#AJAXload').show()
    function complete() {
        window.location.hash = "about";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_clients").click(function () {
    linkClicked = true;
    $('#AJAXload').show();
    function complete() {
        window.location.hash = "clients";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_news").click(function () {
    $('#AJAXload').show()
    linkClicked = true;
    function complete() {
        window.location.hash = "news";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_process").click(function () {
    $('#AJAXload').show();
    linkClicked = true;
    function complete() {
        window.location.hash = "process";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }

    $("#content-target").fadeOut(600, "linear", complete);
});

$("#a_contact").click(function () {
    $('#AJAXload').show()
    linkClicked = true;
    function complete() {
        window.location.hash = "contact";
        var action = window.location.hash.replace('#', '');
        setActiveLink(action);
        $('#content-target').load('/Home/' + action, function (response, status, xhr) {
            $('#content-target').waitForImages(function () {
                $('#content-target').fadeIn('300', function () {
                    $('#AJAXload').hide();
                });
            });
        });
    }
    $("#content-target").fadeOut(600, "linear", complete);
});

function setActiveLink(action) {
    action == "home" ? $("#a_home").parent().addClass("active") : $("#a_home").parent().removeClass("active");
    action == "work" ? $("#a_work").parent().addClass("active") : $("#a_work").parent().removeClass("active");
    action == "about" ? $("#a_about").parent().addClass("active") : $("#a_about").parent().removeClass("active");
    action == "clients" ? $("#a_clients").parent().addClass("active") : $("#a_clients").parent().removeClass("active");
    action == "news" ? $("#a_news").parent().addClass("active") : $("#a_news").parent().removeClass("active");
    action == "process" ? $("#a_process").parent().addClass("active") : $("#a_process").parent().removeClass("active");
    action == "contact" ? $("#a_contact").parent().addClass("active") : $("#a_contact").parent().removeClass("active");
}