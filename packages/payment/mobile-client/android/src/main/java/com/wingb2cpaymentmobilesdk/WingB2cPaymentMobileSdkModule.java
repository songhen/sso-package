package com.wingb2cpaymentmobilesdk;

import android.content.pm.PackageManager;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = WingB2cPaymentMobileSdkModule.NAME)
public class WingB2cPaymentMobileSdkModule extends ReactContextBaseJavaModule {
  public static final String NAME = "WingB2cPaymentMobileSdk";

  public WingB2cPaymentMobileSdkModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }


  @ReactMethod
  public boolean isPackageInstalled(String packageName, Promise promise) {
    try {
      PackageManager packageManager = this.getReactApplicationContext().getPackageManager();
      packageManager.getPackageInfo(packageName, 0);
      promise.resolve(true);
      return true;
    } catch (PackageManager.NameNotFoundException e) {
      Log.d("ERROR MODULE LINKING: ", e.getLocalizedMessage());
      promise.resolve(false);
      return false;
    }
  }
}
