package com.abdd.pharma.web.rest;

import com.abdd.pharma.domain.PaymentMethods;
import com.abdd.pharma.repository.PaymentMethodsRepository;
import com.abdd.pharma.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.abdd.pharma.domain.PaymentMethods}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PaymentMethodsResource {

    private final Logger log = LoggerFactory.getLogger(PaymentMethodsResource.class);

    private static final String ENTITY_NAME = "paymentMethods";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PaymentMethodsRepository paymentMethodsRepository;

    public PaymentMethodsResource(PaymentMethodsRepository paymentMethodsRepository) {
        this.paymentMethodsRepository = paymentMethodsRepository;
    }

    /**
     * {@code POST  /payment-methods} : Create a new paymentMethods.
     *
     * @param paymentMethods the paymentMethods to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new paymentMethods, or with status {@code 400 (Bad Request)} if the paymentMethods has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/payment-methods")
    public ResponseEntity<PaymentMethods> createPaymentMethods(@RequestBody PaymentMethods paymentMethods) throws URISyntaxException {
        log.debug("REST request to save PaymentMethods : {}", paymentMethods);
        if (paymentMethods.getId() != null) {
            throw new BadRequestAlertException("A new paymentMethods cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentMethods result = paymentMethodsRepository.save(paymentMethods);
        return ResponseEntity.created(new URI("/api/payment-methods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /payment-methods} : Updates an existing paymentMethods.
     *
     * @param paymentMethods the paymentMethods to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated paymentMethods,
     * or with status {@code 400 (Bad Request)} if the paymentMethods is not valid,
     * or with status {@code 500 (Internal Server Error)} if the paymentMethods couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/payment-methods")
    public ResponseEntity<PaymentMethods> updatePaymentMethods(@RequestBody PaymentMethods paymentMethods) throws URISyntaxException {
        log.debug("REST request to update PaymentMethods : {}", paymentMethods);
        if (paymentMethods.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PaymentMethods result = paymentMethodsRepository.save(paymentMethods);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, paymentMethods.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /payment-methods} : get all the paymentMethods.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of paymentMethods in body.
     */
    @GetMapping("/payment-methods")
    public List<PaymentMethods> getAllPaymentMethods() {
        log.debug("REST request to get all PaymentMethods");
        return paymentMethodsRepository.findAll();
    }

    /**
     * {@code GET  /payment-methods/:id} : get the "id" paymentMethods.
     *
     * @param id the id of the paymentMethods to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the paymentMethods, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payment-methods/{id}")
    public ResponseEntity<PaymentMethods> getPaymentMethods(@PathVariable Long id) {
        log.debug("REST request to get PaymentMethods : {}", id);
        Optional<PaymentMethods> paymentMethods = paymentMethodsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(paymentMethods);
    }

    /**
     * {@code DELETE  /payment-methods/:id} : delete the "id" paymentMethods.
     *
     * @param id the id of the paymentMethods to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/payment-methods/{id}")
    public ResponseEntity<Void> deletePaymentMethods(@PathVariable Long id) {
        log.debug("REST request to delete PaymentMethods : {}", id);
        paymentMethodsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
