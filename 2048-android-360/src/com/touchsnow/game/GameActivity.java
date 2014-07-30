package com.touchsnow.game;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.os.Looper;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;
import android.widget.Toast;
import com.pubukeji.diandeows.AdType;
import com.pubukeji.diandeows.adviews.DiandeAdView;
import com.pubukeji.diandeows.adviews.DiandeBanner;
import com.pubukeji.diandeows.adviews.DiandeResultCallback;
import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxLocalStorage;


public class GameActivity extends Cocos2dxActivity {
    DiandeAdView insert;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public FrameLayout init() {
        FrameLayout frameLayout = super.init();
        RelativeLayout sdkLayer = new RelativeLayout(this);
        frameLayout.addView(sdkLayer);

        //条幅广告
        RelativeLayout bannerLayer = new RelativeLayout(this);
        RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 150);
        params.addRule(RelativeLayout.ALIGN_PARENT_BOTTOM);
        bannerLayer.setLayoutParams(params);
        bannerLayer.setGravity(Gravity.CENTER);
        sdkLayer.addView(bannerLayer);

        //test bb92999153bbc9861de3399be84c3a14 //my ef01db1786a3764e00f0bdb82386059f
        String banner_AD_ID = "bb92999153bbc9861de3399be84c3a14";
        DiandeBanner banner = new DiandeBanner(this, banner_AD_ID);
        bannerLayer.addView(banner);
        banner.show();
        banner.setRequestCallBack(new DiandeResultCallback() {

            @Override
            public void onSuccess(boolean result, String message) {
                //Toast.makeText(BannerActivity.this, message, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onFailed(String errorMessage) {
                // Toast.makeText(BannerActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onAdShowSuccess(int code, String message) {
                // Toast.makeText(BannerActivity.this, code + "  " + message, Toast.LENGTH_SHORT).show();

            }
        });

        //插屏广告
        //test 78c5db4fd9bb8367ba26868893847738
//        String insert_AD_ID = "78c5db4fd9bb8367ba26868893847738"; //d4600bdc2acd6d02545e0ff00110a839
//        insert = new DiandeAdView(this, insert_AD_ID, AdType.INSERTSCREEN);
//        insert.setRequestCallBack(new DiandeResultCallback() {
//
//            @Override
//            public void onSuccess(boolean result, String message) {
//                Toast.makeText(GameActivity.this, message, Toast.LENGTH_SHORT).show();
//            }
//
//            @Override
//            public void onFailed(String errorMessage) {
//                Toast.makeText(GameActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
//            }
//
//            @Override
//            public void onAdShowSuccess(int code, String message) {
//                Toast.makeText(GameActivity.this, code + "  " + message, Toast.LENGTH_SHORT).show();
//
//            }
//        });

//        insert.load();
//        insert.show();


        //全屏广告
//        String fullScreenAD_ID = "7f42e4d85eaff37f0297b82d4f1a7804";
//        DiandeAdView full = new DiandeAdView(this, fullScreenAD_ID, AdType.FULLSCREEN);
//        full.setRequestCallBack(new DiandeResultCallback() {
//            @Override
//            public void onSuccess(boolean result, String message) {
////                Toast.makeText(GameActivity.this, message, Toast.LENGTH_SHORT).show();
//            }
//
//            @Override
//            public void onFailed(String errorMessage) {
////                Toast.makeText(GameActivity.this, errorMessage, Toast.LENGTH_SHORT).show();
//            }
//
//            @Override
//            public void onAdShowSuccess(int code, String message) {
////                Toast.makeText(GameActivity.this,code+"  "+ message, Toast.LENGTH_SHORT).show();
//            }
//        });

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
                Looper.prepare();
                insert.load();
                insert.show();
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
