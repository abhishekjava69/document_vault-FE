package com.abhishek.documentvault;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void attachBaseContext(Context newBase) {
        Configuration configuration = newBase.getResources().getConfiguration();

        Configuration newConfiguration = new Configuration(configuration);
        newConfiguration.fontScale = 1.0f;

        Context context = newBase.createConfigurationContext(newConfiguration);

        super.attachBaseContext(context);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}