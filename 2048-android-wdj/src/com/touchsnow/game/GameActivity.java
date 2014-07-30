package com.touchsnow.game;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import com.wandoujia.ads.sdk.Ads;
import com.wandoujia.ads.sdk.loader.Fetcher;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxGameActivity;
import org.cocos2dx.lib.Cocos2dxLocalStorage;


public class GameActivity extends Cocos2dxActivity {

    private static final String TAG = "Ads-Jar-Sample";
//    private static final String ADS_APP_ID = "100001049";
//    private static final String ADS_SECRET_KEY = "1c2523e41b2ad4cbc1caa32ae4fffe13";

    private static final String TAG_LIST = "912043885994bf0f10e555a830ecffc3";

//    private static final String TAG_INTERSTITIAL_FULLSCREEN = "ec6e157d7bf91e974cc039234bcee955";
//    private static final String TAG_INTERSTITIAL_WIDGET = "ec6e157d7bf91e974cc039234bcee955";

    private static final String ADS_APP_ID = "100009785";
    private static final String ADS_SECRET_KEY = "cb262b9c64ffc75b96e648f3856d9cc1";
    private static final String ADS_key = "8a520061cc4ee306a23ea74e3b5d4f74";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try {
            Ads.init(this, ADS_APP_ID, ADS_SECRET_KEY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public FrameLayout init() {
        FrameLayout frameLayout = super.init();
        RelativeLayout sdkLayer = new RelativeLayout(this);
        frameLayout.addView(sdkLayer);

        //banner
        RelativeLayout bannerLayer = new RelativeLayout(this);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 150);
        params.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerLayer.setLayoutParams(params);
        bannerLayer.setGravity(Gravity.CENTER);

        Ads.showBannerAd(this, bannerLayer, ADS_key);
        sdkLayer.addView(bannerLayer);

        //interstitial
        // Ads.showAppWidget(GameActivity.this, bannerLayer, TAG_INTERSTITIAL_FULLSCREEN, Ads.ShowMode.FULL_SCREEN);


        //appWall
//        Ads.preLoad(this, Fetcher.AdFormat.appwall, TAG_LIST);
//
//
//        final Fetcher.AdFormat adFormat = Fetcher.AdFormat.interstitial;
//        if (Ads.isLoaded(adFormat, TAG_LIST)) {
//        } else {
//            Ads.preLoad(this, adFormat, TAG_INTERSTITIAL_WIDGET);
//            new Thread() {
//                @Override
//                public void run() {
//                    try {
//                        while (!Ads.isLoaded(adFormat, TAG_INTERSTITIAL_WIDGET)) {
//                            Log.d(TAG, "Wait loading for a while...");
//                            Thread.sleep(2000);
//                        }
//                        Log.d(TAG, "Ads data had been loaded.");
//                        new Handler(Looper.getMainLooper()).post(new Runnable() {
//                            @Override
//                            public void run() {
//                            }
//                        });
//                    } catch (InterruptedException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }.start();
//        }

        actionFromCocos2djs(frameLayout);

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
                // startActivity(new Intent(GameActivity.this, ));
                System.out.println("test interstitial");
//                Ads.showAppWidget(GameActivity.this, null, TAG_INTERSTITIAL_FULLSCREEN, Ads.ShowMode.FULL_SCREEN);
                Ads.showAppWall(GameActivity.this, TAG_LIST);
            }

            @Override
            public String onGetItem(String key) {
                return null;
            }
        });
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
