import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { Dec } from "@keplr-wallet/unit";
import { ObservableRemoveLiquidityConfig } from "@osmosis-labs/stores";
import { Slider } from "../../components/control";
import { BorderButton } from "../buttons";
import { CustomClasses } from "../types";
import { useStore } from "../../stores";

export const RemoveLiquidity: FunctionComponent<
  {
    removeLiquidityConfig: ObservableRemoveLiquidityConfig;
    actionButton: ReactNode;
  } & CustomClasses
> = observer(({ className, removeLiquidityConfig, actionButton }) => {
  const { priceStore } = useStore();

  return (
    <>
      <div
        className={classNames(
          "w-[420px] flex flex-col gap-9 mx-auto text-center",
          className
        )}
      >
        <div className="flex flex-col gap-1">
          <h2 className="mt-12">{`${removeLiquidityConfig.computePoolShareValueWithPercentage(
            priceStore
          )}`}</h2>
          <h5 className="text-osmoverse-100">
            {removeLiquidityConfig.poolShareWithPercentage
              .hideDenom(true)
              .toString()}{" "}
            shares
          </h5>
        </div>
        <div className="flex flex-wrap items-center place-content-around gap-4 rounded-xl border border-osmoverse-600 py-2 px-3 text-osmoverse-300">
          {removeLiquidityConfig.poolShareAssetsWithPercentage.map((asset) => (
            <div
              className="flex items-center gap-2"
              key={asset.currency.coinDenom}
            >
              {asset.currency.coinImageUrl && (
                <Image
                  alt="token icon"
                  src={asset.currency.coinImageUrl}
                  height={16}
                  width={16}
                />
              )}
              <span>{asset.toString()}</span>
            </div>
          ))}
        </div>
        <Slider
          className="w-full my-8"
          currentValue={removeLiquidityConfig.percentage}
          onInput={(value) =>
            removeLiquidityConfig.setPercentage(value.toString())
          }
          min={0}
          max={100}
          step={1}
        />
        <div className="grid grid-cols-4 gap-5 h-9 w-full md:mb-6 mb-14">
          <BorderButton
            onClick={() => removeLiquidityConfig.setPercentage("25")}
            disabled={removeLiquidityConfig.poolShareWithPercentage
              .toDec()
              .equals(new Dec(0))}
          >
            25%
          </BorderButton>
          <BorderButton
            onClick={() => removeLiquidityConfig.setPercentage("50")}
            disabled={removeLiquidityConfig.poolShareWithPercentage
              .toDec()
              .equals(new Dec(0))}
          >
            50%
          </BorderButton>
          <BorderButton
            onClick={() => removeLiquidityConfig.setPercentage("75")}
            disabled={removeLiquidityConfig.poolShareWithPercentage
              .toDec()
              .equals(new Dec(0))}
          >
            75%
          </BorderButton>
          <BorderButton
            onClick={() => removeLiquidityConfig.setPercentage("100")}
            disabled={removeLiquidityConfig.poolShareWithPercentage
              .toDec()
              .equals(new Dec(0))}
          >
            MAX
          </BorderButton>
        </div>
      </div>
      {actionButton}
    </>
  );
});
