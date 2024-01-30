package com.wingb2ccoremobilesdk;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = WingB2cCoreMobileSdkModule.NAME)
public class WingB2cCoreMobileSdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "WingB2cCoreMobileSdk";

  public WingB2cCoreMobileSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }
}
