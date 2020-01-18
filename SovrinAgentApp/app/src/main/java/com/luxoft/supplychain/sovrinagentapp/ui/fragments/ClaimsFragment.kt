/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package com.luxoft.supplychain.sovrinagentapp.ui.fragments

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout
import com.luxoft.supplychain.sovrinagentapp.R
import com.luxoft.supplychain.sovrinagentapp.data.ApplicationState
import com.luxoft.supplychain.sovrinagentapp.data.PackageState
import com.luxoft.supplychain.sovrinagentapp.ui.activities.SimpleScannerActivity
import com.luxoft.supplychain.sovrinagentapp.ui.adapters.ClaimsAdapter
import kotlinx.android.synthetic.main.fragment_claims.*
import kotlinx.android.synthetic.main.fragment_claims.view.*
import org.koin.android.ext.android.inject

class ClaimsFragment : Fragment() {

    private lateinit var swipeRefreshLayout: SwipeRefreshLayout

    private val appState: ApplicationState by inject()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_claims, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {

        appState.walletCredentials.observe({lifecycle}) { creds ->
            tvClaims.text = getString(R.string.verified_credentials, creds.size)
        }

        val getCredentialsButton = view.get_credentials
        view.get_credentials.setOnClickListener {
            ContextCompat.startActivity(getCredentialsButton.context,
                    Intent().setClass(getCredentialsButton.context, SimpleScannerActivity::class.java)
                            .putExtra("state", PackageState.GETPROOFS.name), null
            )
        }

        val linearLayoutManager = LinearLayoutManager(activity)
        recycler.layoutManager = linearLayoutManager
        recycler.addItemDecoration(DividerItemDecoration(recycler.context, linearLayoutManager.orientation))

        recycler.adapter = ClaimsAdapter(appState.walletCredentials)

        swipeRefreshLayout = swipe_container
        swipeRefreshLayout.setOnRefreshListener {
            appState.updateWalletCredentials()
            swipeRefreshLayout.isRefreshing = false
        }
    }
}
