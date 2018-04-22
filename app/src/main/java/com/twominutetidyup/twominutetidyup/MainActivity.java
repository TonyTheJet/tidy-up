package com.twominutetidyup.twominutetidyup;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // set the client to be Chrome, and allow the app to close when the window closes
        WebView mWebView = (WebView) findViewById(R.id.activity_main_webview);
        WebChromeClient webChromeClient = new WebChromeClient(){
            public void onCloseWindow(WebView w){
                super.onCloseWindow(w);
            }
        };
        mWebView.setWebChromeClient(webChromeClient);

        // Enable Javascript
        WebSettings webSettings = mWebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setDomStorageEnabled(true);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);

        mWebView.loadUrl("file:///android_asset/www/index.html");
    }
}
