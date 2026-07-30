package com.gym.gymmanagement.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private BigDecimal amount;

    private LocalDateTime paymentDate;
    private String paymentMethod;
    private String paymentStatus;
    private String invoiceNumber;

    public Payment() {}

    public Payment(Long id, Member member, BigDecimal amount, LocalDateTime paymentDate, String paymentMethod, String paymentStatus, String invoiceNumber) {
        this.id = id;
        this.member = member;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.invoiceNumber = invoiceNumber;
    }

    public static PaymentBuilder builder() {
        return new PaymentBuilder();
    }

    public static class PaymentBuilder {
        private Long id;
        private Member member;
        private BigDecimal amount;
        private LocalDateTime paymentDate;
        private String paymentMethod;
        private String paymentStatus;
        private String invoiceNumber;

        public PaymentBuilder id(Long id) { this.id = id; return this; }
        public PaymentBuilder member(Member member) { this.member = member; return this; }
        public PaymentBuilder amount(BigDecimal amount) { this.amount = amount; return this; }
        public PaymentBuilder paymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; return this; }
        public PaymentBuilder paymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; return this; }
        public PaymentBuilder paymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; return this; }
        public PaymentBuilder invoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; return this; }

        public Payment build() {
            return new Payment(id, member, amount, paymentDate, paymentMethod, paymentStatus, invoiceNumber);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Member getMember() { return member; }
    public void setMember(Member member) { this.member = member; }

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
