package com.gym.gymmanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDTO {
    private Long id;
    private Long memberId;
    private String memberName;
    private BigDecimal amount;
    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String paymentStatus;
    private String invoiceNumber;

    public PaymentDTO() {}

    public PaymentDTO(Long id, Long memberId, String memberName, BigDecimal amount, LocalDateTime paymentDate, String paymentMethod, String paymentStatus, String invoiceNumber) {
        this.id = id;
        this.memberId = memberId;
        this.memberName = memberName;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.invoiceNumber = invoiceNumber;
    }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Long memberId;
        private String memberName;
        private BigDecimal amount;
        private LocalDateTime paymentDate;
        private String paymentMethod;
        private String paymentStatus;
        private String invoiceNumber;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder memberId(Long memberId) { this.memberId = memberId; return this; }
        public Builder memberName(String memberName) { this.memberName = memberName; return this; }
        public Builder amount(BigDecimal amount) { this.amount = amount; return this; }
        public Builder paymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; return this; }
        public Builder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public Builder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public Builder invoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; return this; }

        public PaymentDTO build() {
            return new PaymentDTO(id, memberId, memberName, amount, paymentDate, paymentMethod, paymentStatus, invoiceNumber);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getMemberId() { return memberId; }
    public void setMemberId(Long memberId) { this.memberId = memberId; }

    public String getMemberName() { return memberName; }
    public void setMemberName(String memberName) { this.memberName = memberName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
}
