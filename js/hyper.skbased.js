$(document).ready(() => {
  var e = new Hyperbot({
    timeOut: 5e3,
    runCallBacks: !0,
  });
  e.log(
    ""
  ),
    console.log("checker.js loaded");
  var t = $("#message"),
    a = $("#ccnList"),
    n = $("#cvvList"),
    cr = $("#hitList"),
    c = $("#deadList"),
    i = $("#amount"),
    sklive = $("#sklive"),
    curr = $("#curr"),
    l = $("#showCvv"),
    s = $("#showCcn"),
    sh = $("#showHits"),
    o = $("#showDead"),
    r = $("#hyper_progress"),
    d = $("#saveCvv"),
    h = $("#saveCcn");
  d.hide(), h.hide();
  $("#lista_con"), $("#lista_leb"), $("#amount_container");
  cr.hide(),
  n.hide(),
    a.hide(),
    c.hide(),
    l.click(() => {
      n.slideToggle();
    }),
    s.click(() => {
      a.slideToggle();
    }),
    sh.click(() => {
      cr.slideToggle();
    }),
    o.click(() => {
      c.slideToggle();
    });
  var m = $("#startbtn"),
    v = $("#stopbtn");

  function p() {
    var e = t.val().split("\n");
    e.splice(0, 1), t.val(e.join("\n"));
  }
  v.hide(),
    m.click(() => {
    	if (typeof window.localStorage != 'undefined') {
    localStorage.setItem('resk', sklive.val());
}
      m.html("Please wait..."),
        (async function (l = 200) {
          var s = i.val() ? i.val() : 0.8,
            o = $("#curr").val(),
            forward = $("#fwtype").val(),
            ox = $("#type").val(),
            tg_id = $("#tg_id").val(),
            sk= sklive.val(),
            cur= curr.val(),
            u = t.val(),
            k = u.split("\n"),
            f = k.length,
            g = o || "usd",
            y = 0,
            ht = 0,
            C = 0,
            w = 0;
            if (o === "usd") {
                var symbol = '$';
                }
                else if (o === "eur") {
                var symbol = 'â‚¬';
                }
                else if (o === "gbp") {
                var symbol = 'Â£';
                }
                else if (o === "cad") {
                var symbol = 'Can$';
                }
                else if (o === "inr") {
                var symbol = 'â‚¹';
                }
          void 0 === Array.prototype.sameAs &&
            (Array.prototype.sameAs = function () {
              for (let e = 1; e < this.length; e++)
                if (this[e].startsWith(this[0].slice(0, 6))) return !0;
              return !1;
            });
          const _ = (e) => (null !== e ? e.sameAs() : null);
          

          f
            ? f <= 10001
              ? k.forEach(function (t, i) {
                  setTimeout(function () {
                    $.ajax({
                      url:
                        "api/skbased.php?lista=" +
                        t +
                        "&amt=" +
                        s +
                        "&sym=" +
                        symbol +
                        "&tgid=" +
                        tg_id +
                        "&type=" +
                        ox +"&sk=1" +
                        sk  +"&curr=" +
                        cur +
                        "&forward=" + forward,
                      type: "GET",
                      async: !0,
                      success: function (t) {
                        var i;
                        t.match("âœ˜CHARGED")
                          ? (p(),
                            ht++,
                            (i = t + ""),
                            cr.append("<span>" + i + ""),
                            notify.success(t, "", {
                              duration: 3e3,
                            }))
                          : t.match("âœ˜CVV")
                          ? (p(),
                            y++,
                            (i = t + ""),
                            n.append("<span>" + i + ""),
                            notify.success(t, "", {
                              duration: 3e3,
                            }))
                          : t.match("âœ˜CCN")
                          ? (p(),
                            C++,
                            (function (e) {
                              a.append("<span>" + e + "");
                            })(t + ""))
                          : (p(),
                            w++,
                            (function (e) {
                              c.append("<span>" + e + "");
                            })(t + "")),
                          $("#totalCount").html(f);
                        var l = parseInt(ht)+parseInt(y) + parseInt(C) + parseInt(w);
                        $("#cvvCount").html(y),
                          $("#ccnCount").html(C),
                          $("#hitsCount").html(ht),
                          $("#deadCount").html(w),
                          $("#totalChecked").html(l),
                          $("#cLive2").html(y),
                          $("#cWarn2").html(C),
                          $("#cDie2").html(w);
                        var s = (l / f) * 100;
                        0 !== parseInt(y) &&
                          100 === s &&
                          (d.show(),
                          d.click(async () => {
                            var t = $("#cvvList").text();
                            return e.saveFile({
                              fileName: "darkx_cvv",
                              fileExten: "txt",
                              fileData: [
                                "sá´›Ê€Éªá´˜á´‡\n--------------\n".replace(
                                  /^\s*\n/gm,
                                  ""
                                ) +
                                  t
                                    .replaceAll("#CVV", "\n")
                                    .replace(/^\s*\n/gm, ""),
                              ],
                              saveData: !0,
                            });
                          })),
                          0 !== parseInt(C) &&
                            100 === s &&
                            (h.show(),
                            h.click(async () => {
                              var t = $("#ccnList").text();
                              return e.saveFile({
                                fileName: "darkx_ccn",
                                fileExten: "txt",
                                fileData: [
                                  "sá´›Ê€Éªá´˜á´‡\n--------------\n".replace(
                                    /^\s*\n/gm,
                                    ""
                                  ) +
                                    t
                                      .replaceAll("#CCN", "\n")
                                      .replace(/^\s*\n/gm, ""),
                                ],
                                saveData: !0,
                              });
                            })),
                          r.css({
                            width: `${s.toFixed(0) + "%"}`,
                            height: "3px",
                          }),
                          r.addClass(
                            "animate__animated animate__lightSpeedInLeft"
                          );
                        var o = "Processing..." + s.toFixed(0) + "%";
                        m.html(o),
                          m.addClass(" animate__animated animate__flip "),
                          100 === s &&
                            (
                            m.html("Checking completed!"),
                            setTimeout(() => {
                              m.html("START CHECK");
                            }, 1500)
                            );
                      },
                    });
                  }, l * i);
                })
              : window.location.replace("./limit.php")
            : notify.error("Please add a cc!", "", {
                duration: 5e3,
              });
        })();
    });
});