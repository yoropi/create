/***
 テスト用不要要素の排除
***/
//名前の削除
jQuery("h4.media-heading.ng-binding").remove();

/***
 クラス名追加
***/
var comment = jQuery("div.list-group-item.collection-item.message-item.ng-scope a");
var user = jQuery("div.user-menu ul.user-menu-list a")[0].href.split("/")[4];
var date = jQuery(".pull-right.time_ago.text-muted.ng-binding");
var move_parent = jQuery(".media-body");
var move_before = jQuery(".message-body.ng-binding");
for(var i=0; i < comment.length; i++){
    var uid = comment[i].href.split("members/")[1]

    if(uid == user){
        comment[i].closest('.list-group-item.collection-item.message-item.ng-scope').classList.add("user");
        comment[i].closest('.media-left').remove();//自分のアバター削除
    }else{
        comment[i].closest('.list-group-item.collection-item.message-item.ng-scope').classList.add("partner");
        move_parent[i].appendChild(date[i]);//要素の移動
    }
}

/***
 時間表示・日付変更線制御
***/
var date = jQuery(".pull-right.time_ago.text-muted.ng-binding");//併記

var date_list = jQuery(".pull-right.time_ago.text-muted.ng-binding span");
var last_date = null;
for(var i=0; i < date_list.length; i++){
    jQuery(".time_ago.text-muted.ng-binding")[i].innerHTML=date[i].innerHTML.match(/.*\<\/span\>/);//既存情報の削除
    var date_data = date_list[i].title;//titleから送信時間の取得"2018-01-16T19:03:16.000Z"
    var local_time = new Date(date_data);//日本時間に変換
    var Transmission = ((("0"+local_time.getHours()).slice(-2))+":"+(("0"+local_time.getMinutes()).slice(-2)));//送信時間の整形**:**
    jQuery(".pull-right.time_ago.text-muted.ng-binding span").eq(i).html(Transmission);//送信時間の代入
    
    /**日付変更線制御**/
    var displayTime = (local_time.getFullYear()+"/"+(("0"+local_time.getMonth()+1).slice(-2))+"/"+(("0"+local_time.getDate()).slice(-2))+"/"+([" (Sun)"," (Mon)"," (Tue)"," (Wed)"," (Thu)"," (Fri)"," (Sat)"][local_time.getDay()]));//送信時間の整形2018/01/21 (Sun)
    
    if(last_date){
        if(last_date != displayTime){
            var addDate = jQuery(".list-group-item.collection-item.message-item.ng-scope")[i];
            $('<div class="label-container"><span>'+displayTime+'</span></div>').insertBefore(addDate);
            //DOM操作記述
        }
    }
    var last_date = displayTime;
}

