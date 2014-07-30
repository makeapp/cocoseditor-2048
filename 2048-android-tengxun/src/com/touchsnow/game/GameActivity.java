package com.touchsnow.game;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import com.qq.e.ads.AdRequest;
import com.qq.e.ads.AdSize;
import com.qq.e.ads.AdView;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGameActivity;


public class GameActivity extends Cocos2dxActivity {

    private AdView bannerAD;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public FrameLayout init() {
        FrameLayout frameLayout = super.init();
        RelativeLayout sdkLayer = new RelativeLayout(this);
        frameLayout.addView(sdkLayer);

//        RelativeLayout rlMain = new RelativeLayout(this);
//        rlMain.setHorizontalGravity(Gravity.TOP|Gravity.CENTER_HORIZONTAL);
//        // 创建广告View
//        AdView.setAppSid(this, "b1067edd");
//        AdView.setAppSec(this, "b1067edd");
//        AdView adView = new AdView(this);
//        rlMain.addView(adView);
//        frameLayout.addView(rlMain);
//        return frameLayout;

        //banner
        RelativeLayout bannerLayer = new RelativeLayout(this);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 150);
        params.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerLayer.setLayoutParams(params);
        bannerLayer.setGravity(Gravity.CENTER);
        sdkLayer.addView(bannerLayer);

        AdView bannerAD = new AdView(this, AdSize.BANNER, Constants.APPId, Constants.BannerPosId);
        bannerLayer.removeAllViews();
        bannerLayer.addView(bannerAD);
        bannerAD.fetchAd(new AdRequest());


        //interstitial

        //appWall

        return frameLayout;
    }


    public boolean dispatchKeyEvent(KeyEvent event) {
        if (event.getKeyCode() == KeyEvent.KEYCODE_BACK) {
            onBackPressed();
            return true;
        }
        return super.dispatchKeyEvent(event);
    }


    public void onBackPressed() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this)
                .setTitle("")
                .setMessage("退出游戏?")
                .setNegativeButton("Yes", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        System.exit(0);
                        finish();
                    }
                }).setPositiveButton("No", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {

                    }
                });
        AlertDialog dialog = builder.create();
        dialog.show();
    }

    static {
        System.loadLibrary("cocos2dx-game");
    }

}
