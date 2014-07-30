package com.touchsnow.game;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import com.baidu.mobads.AdView;
import com.baidu.mobads.InterstitialAd;
import com.baidu.mobads.InterstitialAdListener;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGameActivity;
import org.cocos2dx.lib.Cocos2dxLocalStorage;


public class GameActivity extends Cocos2dxActivity {

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

        // 创建广告View
        AdView.setAppSid(this, "1003b991");  //b1067edd
        AdView.setAppSec(this, "1003b991");  //b1067edd
        AdView adView = new AdView(this);
        bannerLayer.addView(adView);


        //interstitial

        //appWall

//        actionFromCocos2djs(frameLayout);

        return frameLayout;
    }

    public void actionFromCocos2djs(FrameLayout frameLayout) {
        RelativeLayout layout = new RelativeLayout(this);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 600);
        params.addRule(RelativeLayout.CENTER_IN_PARENT);
        layout.setLayoutParams(params);
        layout.setGravity(Gravity.CENTER);
        Cocos2dxLocalStorage.setItemHandler("ad", new Cocos2dxLocalStorage.ItemHandler() {
            @Override
            public void onSetItem(String key, String value) {
                interstitialAd();
            }

            @Override
            public String onGetItem(String key) {
                return null;
            }
        });
    }

    public void interstitialAd() {
        final InterstitialAd interAd = new InterstitialAd(this);
        interAd.setListener(new InterstitialAdListener() {

            @Override
            public void onAdClick(InterstitialAd arg0) {
                Log.i("InterstitialAd", "onAdClick");
            }

            @Override
            public void onAdDismissed() {
                Log.i("InterstitialAd", "onAdDismissed");
                interAd.loadAd();
            }

            @Override
            public void onAdFailed(String arg0) {
                Log.i("InterstitialAd", "onAdFailed");
            }

            @Override
            public void onAdPresent() {
                Log.i("InterstitialAd", "onAdPresent");
            }

            @Override
            public void onAdReady() {
                Log.i("InterstitialAd", "onAdReady");
            }

        });

        if (interAd.isAdReady()) {
            interAd.showAd(GameActivity.this);
        } else {
            interAd.loadAd();
        }
//        interAd.loadAd();
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
