import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const { dismiss } = useBottomSheetModal();
  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      overDragResistanceFactor={0}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      style={styles.bottomModal}
    >
      <View style={styles.contentModal}>
        <View style={styles.toogle}>
          <TouchableOpacity style={styles.toogleActive}>
            <Text style={styles.toogleTextActive}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toogleInactive}>
            <Text style={styles.toogleTextInactive}>Retirada</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxListAddress}>
          <Text style={styles.titleH2}>Meus endereços:</Text>

          <View style={styles.notFound}>
            <Ionicons name="sad-outline" size={48} color={Colors.medium} />
            <Text style={styles.notFoundText}>Nenhum endereço cadastrado</Text>
          </View>

          <Link href={"/(app)/account/addAddress"} asChild>
            <TouchableOpacity style={styles.buttonAddNewAddress}>
              <Text style={styles.textButtonAddNewAddress}>
                Adicionar novo endereço
              </Text>
              <Ionicons
                name="add-circle-outline"
                size={16}
                color={Colors.mediumDark}
              />
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity
          onPress={() => dismiss()}
          style={styles.buttonConfirmation}
        >
          <Text style={styles.textConfirmation}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomModal: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 0,
  },
  contentModal: {
    flex: 1,
  },
  toogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  toogleActive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  toogleTextActive: {
    color: Colors.white,
  },
  toogleInactive: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  toogleTextInactive: {
    color: Colors.primary,
    fontFamily: "Inter_400Regular",
  },
  buttonConfirmation: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    margin: 16,
    marginTop: 0,
  },
  boxListAddress: {
    padding: 16,
  },
  titleH2: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
    color: Colors.mediumDark,
  },
  buttonAddNewAddress: {
    backgroundColor: Colors.lightGrey,
    padding: 16,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  textButtonAddNewAddress: {
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
  textConfirmation: {
    color: Colors.white,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
  },
  notFound: {
    paddingVertical: 32,
    alignItems: "center",
  },
  notFoundText: {
    color: Colors.medium,
  },
});

export default BottomSheet;
