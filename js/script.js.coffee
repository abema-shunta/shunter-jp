$(()->
  _ = window.global = {}
  _.CLICK = if window.ontouchstart == undefined then 'click' else 'touchend'
  _.X = 0
  _.Y = 0

  prefix = (key, value)->
    obj = undefined
    obj = {}
    obj['' + key] = '' + value
    obj['-webkit-' + key] = '' + value
    obj['-moz-' + key] = '' + value
    obj['-o-' + key] = '' + value
    obj
  
  initWindow = ()->
    _.SHORT = if _.WIDTH > _.HEIGHT then _.HEIGHT else _.WIDTH
    _.LARGE = if _.WIDTH > _.HEIGHT then _.WIDTH else _.HEIGHT
    _.IS_LANDSCAPE = _.WIDTH > _.HEIGHT
    console.log _.IS_LANDSCAPE
    $("#SelfIntroduction").css({
      "width": "#{_.SHORT}px",
      "height": "#{_.SHORT}px",
      "top": "#{if _.IS_LANDSCAPE then '0px' else ((_.HEIGHT-_.SHORT)/2)+'px'}",
      "left": "#{if !_.IS_LANDSCAPE then '0px' else ((_.WIDTH-_.SHORT)/2)+'px'}"
    })
    $("#Icon").css({
      "width": "#{_.SHORT/2}px",
      "height": "#{_.SHORT/2}px",
      "top": "#{_.SHORT/4}px",
      "left": "#{_.SHORT/4}px"
    })
    $("#Icon img").css({
      "width": "#{_.SHORT/2}px",
      "height": "#{_.SHORT/2}px"
    })
    $("#Title").css({
      "width": "#{_.SHORT/2}px",
      "height": "#{_.SHORT/(2*6)}px",
      "top": "#{((_.SHORT*3)/4) + 10}px",
      "left": "#{_.SHORT/4}px",
      "font-size": "#{_.SHORT/(4*6)}px"
    })
    $("#Tail i").css("font-size", "#{_.SHORT/(4*3)}px")

  initGridWall = ()->

    item_size = _.LARGE / _.EDGE_SIZE
    $("#Wall").html("")
    $("#Wall").css
      "width": "#{_.LARGE}px"
      "height": "#{_.LARGE}px"
      "top": "#{if _.IS_LANDSCAPE then -1 * (_.LARGE-_.SHORT)/2 else 0}px"
      "left": "#{unless _.IS_LANDSCAPE then -1 * (_.LARGE-_.SHORT)/2 else 0}px"
    for i in [0..8]
      r = parseInt i/3
      c = parseInt i%3
      $div = $("<div class='pane'></div>")
      $div.css
        "width": "#{_.LARGE}px"
        "height": "#{_.LARGE}px"
        "top": "#{_.LARGE * (r-1)}px"
        "left": "#{_.LARGE * (c-1)}px"
      for random_index, pos in _.RANDOM_ARRAY
        if content = _.DATA[random_index]
          $item = $("<div class='item'></div>")
          ir = parseInt pos/_.EDGE_SIZE
          ic = parseInt pos%_.EDGE_SIZE
          $item.css
            "width": "#{item_size}px"
            "height": "#{item_size}px"
            "top": "#{item_size * (ir)}px"
            "left": "#{item_size * (ic)}px"
            "background-image": "url(/img/#{content.type}/#{content.name}_th.png)"
          for k,v of content
            $item.data(k,v)
        $div.append $item
      $("#Wall").append $div
    $(".item").bind _.CLICK, ()->
      _.SELECTED = true
      $item = $(@)
      color = $item.data("color")
      r = parseInt(color.substring(1,3),16)
      g = parseInt(color.substring(3,5),16)
      b = parseInt(color.substring(5,7),16)

      $("#DetailModal").css("background", "rgba(#{r},#{g},#{b},0.9)")
      $("#ScreenShot").attr("src", "/img/#{$item.data('type')}/#{$item.data('name')}.png")
      $("#ContentTitle").text($item.data('title'))
      $("#Description").text($item.data('description'))
      $("#EditedDate").text($item.data('date'))
      switch $item.data('type')
        when 'logo' then type = 'Logo' 
        when 'ig' then type = 'Infographics' 
        when 'web' then type = 'Web' 
      $("#ContentType").text(type)
      if $item.data('url')
        $("#ContentTitle").append($("<a href='#{$item.data('url')}'><i class='fa fa-external-link'></i></a>"))
      $("#Detail").text($item.data('detail'))
      $("#DetailModal").addClass('active')

  _.DATA = [
    {
      "name": "0701",
      "title": "Synergy Networks",
      "date": "2013/07/01",
      "type": "logo",
      "description": "ネットワーク構築を主とするIT関連企業様へのロゴデザイン提案(不採用)",
      "color": "#EF7200"
      "detail": "
      ロゴの提案です。ネットワーク関連会社のために、「つながり」を軸として
      同じ矩形を組み合わせたロゴの提案をしています。フォントの顔とロゴのスタイルに統一性を出すことで
      印象的にするように心がけています。
      "
    },
    { 
      "name": "0702",
      "title": "Think Blue",
      "date": "2013/07/02",
      "type": "logo",
      "description": "植物を使った空間装飾の会社様へのロゴデザイン提案(不採用)",
      "color": "#4966E2"
      "detail": "
      ロゴの提案です。植物を使った空間装飾の会社ということで、
      植物をモチーフとしたデザインにしています。
      シンプルな構成にしながらも、フォントの顔とロゴのスタイルに統一性を出すことで
      印象的にするように心がけています。
      "
    },
    {
      "name": "0703",
      "title": "UNICORN CAFÉ",
      "date": "2013/07/03",
      "type": "logo",
      "description": "ユニコーンがテーマのカフェ運営会社様へのロゴデザイン提案(不採用)",
      "color": "#009FC8",
      "detail": "
      ロゴの提案です。ユニコーンをシンプルなシェイプへと落としこんでいます。
      ユニコーンだということが伝わりながらも単純化できるバランスを模索しました。
      生き物らしさが失われている点では改善の余地がありそうです。
      "
    },
    {
      "name": "0704",
      "title": "造園設計・施工・管理の三楽",
      "date": "2013/07/04",
      "type": "logo",
      "description": "造園施工会社様へのロゴデザイン提案(不採用)",
      "color": "#B6D3AB",
      "detail": "
      ロゴの提案です。造園会社ということで、自然の代表的な要素である
      太陽と植物、水をモチーフにしたロゴになっています。日本らしさを
      強調し、和紙を思わせる淡い色調で統一し、配置も遠く日本地図を思わせる
      構成にしています。
      "
    },
    {
      "name": "0705",
      "title": "ROCK ME!",
      "date": "2013/07/05",
      "type": "logo",
      "description": "コンテンツの企画・開発会社様へのロゴデザイン提案(不採用)",
      "color": "#95211E"
      "detail": "
      ロゴの提案です。「ファンタジーで世の中を元気にしたい」という企業様の理念と、
      「ROCK ME!」という名前から、エネルギッシュなメッセージ性を感じ、それを踏襲するように
      強めの色調とグランジテイストで仕上げています。
      "
    },
    {
      "name": "0706",
      "title": "カレー大学",
      "date": "2013/07/06",
      "type": "logo",
      "description": "メーカー様企画の大学のためのロゴデザイン提案(不採用)",
      "color": "#52130B"
      "detail": "
      ロゴの提案です。カレー専門の大学ということで、カレーを全面に押し出した
      デザインになっています。「カレーを注ぐと、そこに気づきがある」をコンセプトとし、
      カレーの注ぎ口に気づきの「!」を配置。甘口と辛口のカレーを思わせる濃さが違う
      ２色の茶色を使って幅のあるカレーも演出しています。
      "
    },
    {
      "name": "0708",
      "title": "タッチパネル研究所",
      "date": "2013/07/08",
      "type": "logo",
      "description": "タッチパネルを専門とする企業様へのロゴデザイン提案(不採用)",
      "color": "#83C320"
      "detail": "
      ロゴの提案です。タッチパネルの企業ということを全面に押し出しました。「洗練さ」を
      思わせるために、ロゴを可能な限りシンプルに構成しています。「タッチパネル」と「ものづくり = アイデア」
      を統合したメッセージを出すように、ぱっと見は豆電球、よく見るとパネルをタッチしている場面
      と、見る人の注目度によってメッセージが変わる形にしています。
      "
    },
    {
      "name": "0709",
      "title": "Genequest",
      "date": "2013/07/09",
      "type": "logo",
      "description": "バイオ関連のベンチャー企業様へのロゴデザイン提案(不採用)",
      "color": "#AFA700"
      "detail": "
      ロゴの提案です。バイオ関連の企業ということで、遺伝子を思わせるねじれたはしご状の
      シェイプをベースとしています。ねじれ方を調整することで、上下で「G」「Q」の形を
      思わせる構成にして、社名との関連も演出しています。
      "
    },
    {
      "name": "0710",
      "title": "Hippopotamus Cafe",
      "date": "2013/07/10",
      "type": "logo",
      "description": "カフェの運営会社様へのロゴデザイン提案(不採用)",
      "color": "#1E5969"
      "detail": "
      ロゴの提案です。カバがもつゆったりさやほのぼのさを、カフェのコンセプトとして
      おいているとのことで、可愛らしさや、憎めない感じを演出するように書いています。
      "
    },
    {
      "name": "0712",
      "title": "ADLINE",
      "date": "2013/07/12",
      "type": "logo",
      "description": "IT関連の広告代理店事業の企業様へのロゴデザイン提案(不採用)",
      "color": "#95211E"
      "detail": "
      ロゴの提案です。高級感を求めていたために、トリッキーなことはせずに重厚感と
      歴史を感じられるようなフォントとロゴマークで構成しています。金のテクスチャを
      あしらっても、違和感がない仕上がりになっています。
      "
    },
    {
      "name": "20131218",
      "title": "Nobollel",
      "date": "2013/12/18",
      "type": "logo",
      "description": "Nobollel様へのロゴデザイン",
      "color": "#999999",
      "detail": "
      Noborder + Parallel （ ボーダーレスの世界 + 並列 ) 
      スペクトルな色は様々な個性、六つの四角は六大大陸を表し、
      世界を規則的にならべることで垣根のないひとつの物として
      表現しています。直線的な配置は、多岐に及ぶ事柄を実行する
      並行性を表しています。
      "
    },      
    {
      "name": "shrinking_japan",
      "title": "Shrinking Japan",
      "date": "2013/7/01",
      "type": "ig",
      "description": "日本の人口推移の減少を表したインフォグラフィクス",
      "color": "#87B7B3"
      "detail": "
      人口減少を表現したインフォグラフィクスです。
      人口の推移を表現する以上に、その問題提起を主題として作ってあります。
      タイムリミットを思わせる砂時計という大きなメタファとともに、
      砂は人口やそれに付随する出来事、下の受け皿は取らなければいけない対策を象徴しています。
      "
    },
    {
      "name": "uhe",
      "title": "Upper House Election Table",
      "date": "2013/7/01",
      "type": "ig",
      "description": "参議院議員選挙のまとめ",
      "color": "#3A0B0A"
      "detail": "
      参議院議員選挙の東京都選出の候補者を商店となる政策で比較できるようにまとめた
      インフォグラフィクスです。
      "
    },      
    {
      "name": "naturallog",
      "title": "Natural Log",
      "date": "2014/09/01",
      "type": "web",
      "description": "時系列で書き留められるメモアプリ",
      "color": "#A4Ab94",
      "url": "http://profile.syunta-furukawa-uk.info/naturallog/",
      "detail": "
      会議やワークショップなど、起こった出来事をその起こった時系列のままに
      メモしたいときに役立つアプリケーションです。入力した文章に、
      その時間が自動で情報として付随されるので、自分で時間を気にする必要はありません。
      "
    },      
    {
      "name": "picklr",
      "title": "Picklr",
      "date": "2014/09/01",
      "type": "web",
      "description": "直感的に色を取り出せるWebアプリ",
      "color": "#328018"
      "url": "http://profile.syunta-furukawa-uk.info/angular/picklr/",
      "detail": "
      マウスの動きから色を選んでくれ、16進数表示してくれるアプリです。
      いい色が見つかったら、クリックすると画面下にストックされていきます。
      ランダムに色を選びたいときに便利です。
      "
    },
    {
      "name": "knight_tour_solver",
      "title": "Knight Tour Solver",
      "date": "2015/06/01",
      "type": "web",
      "description": "ナイトツアーの解答を計算できるアプリ",
      "color": "#990000"
      "url": "http://profile.syunta-furukawa-uk.info/kt/",
      "detail": "
      任意のマス目の地形と開始位置を指定すると、ナイトツアーの
      パスを計算して表示してくれるアプリケーションです。
      "
    }            
  ]

  updateTransform = (dx, dy)->
    if _.X > _.LARGE && dx > 0 then _.X -= _.LARGE
    if _.X < -_.LARGE && dx < 0 then _.X += _.LARGE
    if _.Y > _.LARGE && dy > 0 then _.Y -= _.LARGE
    if _.Y < -_.LARGE && dy < 0 then _.Y += _.LARGE
    $("#Wall").css prefix("transform", "translateX(#{_.X}px) translateY(#{_.Y}px)")

  do prepareGridWall = ()->
    data_size = _.DATA.length 
    _.EDGE_SIZE = parseInt(Math.sqrt(data_size))+6
    _.PANEL_SIZE = _.EDGE_SIZE * _.EDGE_SIZE
    _.RANDOM_ARRAY = []
    for i in [0.._.PANEL_SIZE-1]
      index = parseInt( Math.random() * _.PANEL_SIZE )
      while true
        if _.RANDOM_ARRAY[index]
          index = index + 1
        else
          _.RANDOM_ARRAY[index] = i
          break
    
    dragging = ()->
      _.X += d3.event.dx
      _.Y += d3.event.dy
      updateTransform(d3.event.dx, d3.event.dy)

    wall = d3.select("#Wall")
    _.DRAG = d3.behavior.drag().on('drag', dragging)
    wall.call(_.DRAG)

  do getWindowSize = ()->  
    w = window
    d = document
    e = d.documentElement
    g = d.getElementsByTagName('body')[0]
    _.WIDTH = w.innerWidth || e.clientWidth || g.clientWidth
    _.HEIGHT = w.innerHeight|| e.clientHeight|| g.clientHeight
    do initWindow
    do initGridWall

  _.DIFF_Y = 0.1
  _.DIFF_X = 0
  setInterval((()-> 
    unless(_.SELECTED)
      _.Y += _.DIFF_Y
      _.X += _.DIFF_X
      updateTransform(0, 1)
    return 
  ), 10)

  handleOrientation = (event)-> 
    if event.beta
      _.DIFF_Y = (event.beta-30) / 20
      _.DIFF_X = event.gamma / 20

  window.addEventListener("deviceorientation", handleOrientation, true);


  $("#Icon").bind _.CLICK, ()->
    $face = $("#Face")
    $tail = $("#Tail")
    if $face.hasClass("active")
      $face.removeClass("active")
      setTimeout((()->$tail.addClass("active")), 250)
    else 
      $tail.removeClass("active")
      setTimeout((()->$face.addClass("active")), 250)

  window.onresize = -> getWindowSize()

  showWindow = ()->
    $("#Container").addClass("ready")
    setTimeout((()->$("#Container").css prefix("transition","none")), 500)
  setTimeout(showWindow, 500)

  $("#CloseButton").bind _.CLICK, ()->
    $("#DetailModal").removeClass("active")
    _.SELECTED = false


)